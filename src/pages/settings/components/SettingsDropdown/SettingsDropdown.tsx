// src/pages/settings/components/SettingsDropdown/SettingsDropdown.tsx
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/shared/context/AuthContext';
import { useLogout } from '@/shared/hooks/useAuth';

import { getSettingsData } from './settingsData';
import { useOutsideClick } from './useOutsideClick';

interface SettingsDropdownProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onShowConsentModal?: () => void;
}

const SettingsDropdown = ({ open, setOpen, onShowConsentModal }: SettingsDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null!);
    const navigate = useNavigate();
    const { logout: authLogout } = useAuth();
    const logoutMutation = useLogout();

    useOutsideClick(dropdownRef, () => setOpen(false));

    const handleLogout = async () => {
        console.log('🚪 [SETTINGS] 로그아웃 버튼 클릭');

        try {
            // 서버 로그아웃 API 호출 (refresh token 무효화)
            console.log('📡 [SETTINGS] 서버 로그아웃 API 호출 시작');
            await logoutMutation.mutateAsync();
            console.log('✅ [SETTINGS] 서버 로그아웃 API 성공');

            // 로컬 상태 정리 (토큰 제거, 사용자 정보 삭제)
            console.log('🧹 [SETTINGS] 로컬 상태 정리 시작');
            authLogout();

            // 홈페이지로 리다이렉트
            console.log('🏠 [SETTINGS] 홈페이지로 리다이렉트');
            void navigate('/');
        } catch (error) {
            // 에러가 발생해도 로컬 상태는 정리
            console.error('❌ [SETTINGS] 로그아웃 중 오류 발생:', error);
            console.log('🧹 [SETTINGS] 오류 발생 시에도 로컬 상태 정리');
            authLogout();
            void navigate('/');
        }
    };

    // settingsData를 컴포넌트 내부에서 생성하여 handleLogout 함수를 전달
    const settingsData = getSettingsData(navigate, handleLogout);

    if (!open) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="border-black-30 absolute top-full right-0 z-50 mt-2 flex h-[431px] w-[320px] flex-col justify-center rounded-[10px] border-[0.5px] bg-white p-6 shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.15)]">
                <h2 className="text-24px-semibold mb-10 text-center">설정</h2>
                {settingsData.map((section, i) => (
                    <div key={section.category} className={i === 0 ? '' : 'mt-6'}>
                        <h3 className="text-20px-medium text-black-70 mb-4 pl-3">{section.category}</h3>
                        <ul className="flex flex-col gap-1.5 pl-3">
                            {section.items.map((item) => (
                                <li key={item.label}>
                                    <button
                                        onClick={() => {
                                            setOpen(false);
                                            if (item.label === '정보 동의 설정') {
                                                onShowConsentModal?.();
                                            } else if (item.path) {
                                                void navigate(item.path);
                                            } else if (item.onClick) {
                                                void item.onClick();
                                            }
                                        }}
                                        className="text-18px-medium text-black-50 w-full cursor-pointer text-left transition-colors hover:text-black"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {i < settingsData.length - 1 && <hr className="w-0.85 border-black-30 mx-auto mt-4" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsDropdown;
