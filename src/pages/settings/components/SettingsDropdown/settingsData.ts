import type { NavigateFunction } from 'react-router-dom';

import { LOGIN_METHOD_STORAGE_KEY } from '@/shared/constants/authConstants';
import type { LoginMethod } from '@/shared/context/AuthContext';

type SettingsItemKind = 'button' | 'info';

export interface SettingsItem {
    label: string;
    path?: string;
    onClick?: () => void;
    kind?: SettingsItemKind;
}

export interface SettingsSection {
    category: string;
    items: SettingsItem[];
}

interface GetSettingsDataParams {
    navigate: NavigateFunction;
    loginMethod?: LoginMethod | null;
    handleLogout?: () => Promise<void>;
}

const isSocialLogin = (method?: LoginMethod | null) => method === 'kakao' || method === 'google';

export const getSettingsData = ({ navigate, loginMethod, handleLogout }: GetSettingsDataParams): SettingsSection[] => {
    const sections: SettingsSection[] = [];

    if (!isSocialLogin(loginMethod)) {
        sections.push({
            category: '계정',
            items: [
                { label: '비밀번호 변경', path: '/settings/password' },
                { label: '이메일 변경', path: '/settings/email' },
            ],
        });
        sections.push({
            category: '기타',
            items: [
                { label: '정보 동의 설정' },
                { label: '회원 탈퇴', path: '/settings/delete' },
                {
                    label: '로그아웃',
                    onClick: handleLogout
                        ? () => {
                              void handleLogout();
                          }
                        : () => {
                              void (async () => {
                                  // 폴백: handleLogout이 전달되지 않은 경우
                                  localStorage.removeItem('accessToken');
                                  localStorage.removeItem(LOGIN_METHOD_STORAGE_KEY);
                                  void navigate('/');
                              })();
                          },
                },
            ],
        });
    } else {
        sections.push({
            category: '계정',
            items: [
                { label: '정보 동의 설정' },
                { label: '회원 탈퇴', path: '/settings/delete' },
                {
                    label: '로그아웃',
                    onClick: handleLogout
                        ? () => {
                              void handleLogout();
                          }
                        : () => {
                              void (async () => {
                                  // 폴백: handleLogout이 전달되지 않은 경우
                                  localStorage.removeItem('accessToken');
                                  localStorage.removeItem(LOGIN_METHOD_STORAGE_KEY);
                                  void navigate('/');
                              })();
                          },
                },
            ],
        });
    }

    return sections;
};
