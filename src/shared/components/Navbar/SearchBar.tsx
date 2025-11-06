import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchDropdown from '@/pages/search/components/SearchDropdown';
import SearchIcon from '@/shared/assets/search.svg?react';
// 로그인 여부로 드롭다운 노출을 가드
import { useAuth } from '@/shared/context/AuthContext';

const MIN_QUERY_LENGTH = 2;

const SearchBar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    // 드롭다운 열림/닫힘 제어
    const [open, setOpen] = useState(false);
    // 히스토리 목록
    const [historyItems, setHistoryItems] = useState<string[]>([]);
    // 바깥 클릭 감지
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    // 로그인 사용자만 드롭다운 사용
    const { isAuthenticated } = useAuth();

    const goToSearch = (value?: string) => {
        const trimmed = (value ?? keyword).trim();
        if (trimmed.length < MIN_QUERY_LENGTH) {
            return;
        }
        void navigate(`/search?query=${encodeURIComponent(trimmed)}`);

        // 로그인된 경우에만 히스토리 업데이트
        if (isAuthenticated) {
            setHistoryItems((prev) => {
                const next = [trimmed, ...prev.filter((x) => x !== trimmed)];
                return next.slice(0, 10);
            });
        }

        // 검색 후 드롭다운 닫기
        setOpen(false);
        setKeyword('');
    };

    // 인풋 포커스 시 드롭다운 오픈 및 히스토리 불러오기 트리거
    const handleFocus = () => {
        if (!isAuthenticated) {
            setOpen(false);
            return;
        }
        setOpen(true);
    };

    // 컴포넌트 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full md:max-w-[455px] lg:max-w-[555px]">
            <div className="border-main flex h-[35px] w-full gap-4 rounded-full border px-4 py-2 outline-none focus:ring-1 focus:ring-blue-400 md:h-[40px] md:max-w-[455px] md:min-w-[300px] lg:h-[45px] lg:max-w-[555px] lg:min-w-[400px]">
                <input
                    ref={inputRef}
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onFocus={handleFocus}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if ((e.nativeEvent as any).isComposing) return;
                            void goToSearch();
                        }
                        if (e.key === 'Escape') setOpen(false);
                    }}
                    placeholder="찾고 싶은 기사가 있나요?"
                    className="placeholder: text-14px-medium sm:text-16px-medium md:text-18px-medium lg:text-20px-medium text-main-70 w-full pl-1 outline-none focus:outline-none"
                />
                <button onClick={() => void goToSearch()} className="hover:cursor-pointer">
                    <SearchIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                </button>
            </div>
            {/* 로그인된 사용자에게만 드롭다운 표시 */}
            {isAuthenticated && (
                <SearchDropdown
                    open={open}
                    inputValue={keyword}
                    items={historyItems}
                    onSelect={(q) => {
                        void goToSearch(q);
                    }}
                />
            )}
        </div>
    );
};

export default SearchBar;
