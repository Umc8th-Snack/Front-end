import { useMemo } from 'react';

type SearchDropdownProps = {
    open: boolean;
    inputValue: string;
    items: string[];
    onSelect: (q: string) => void;
};

export default function SearchDropdown({ open, inputValue, items, onSelect }: SearchDropdownProps) {
    const filtered = useMemo(() => {
        if (!inputValue) return items;
        const v = inputValue.toLowerCase();
        return items.filter((q) => q.toLowerCase().includes(v));
    }, [items, inputValue]);

    // 빈 상태 문구 상황에 따라 분기
    const isFiltering = inputValue.length > 0; // 입력값 존재 여부
    const emptyText = isFiltering ? '' : '최근 검색어가 아직 없어요.';

    if (!open) return null; // 훅 호출 이후에 early return

    return (
        <div
            role="listbox"
            className="border-main absolute top-full right-0 left-0 z-50 mt-2 rounded-2xl border bg-white shadow-lg"
        >
            <div className="mt-1 flex items-center justify-between px-5 py-2">
                <span className="text-14px-medium sm:text-16px-medium md:text-18px-medium lg:text-20px-medium text-main-70">
                    {isFiltering ? '일치하는 검색어' : '최근 검색어'}
                </span>
            </div>

            <ul className="max-h-72 overflow-y-auto py-1">
                {filtered.length === 0 ? (
                    <li className="text-14px-medium sm:text-16px-medium md:text-18px-medium lg:text-20px-medium text-black-50 px-5 py-1">
                        {emptyText}
                    </li>
                ) : (
                    filtered.map((q) => (
                        <li key={q} className="px-2">
                            <button
                                onClick={() => onSelect(q)}
                                className="text-14px-medium sm:text-16px-medium md:text-18px-medium lg:text-20px-medium hover:text-main-70 w-full cursor-pointer truncate rounded-lg px-3 py-2 text-left hover:bg-black/5"
                            >
                                {q}
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
