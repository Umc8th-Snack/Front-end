import type { NavigateFunction } from 'react-router-dom';

import { logout } from '@/pages/settings/apis/auth';

export const getSettingsData = (navigate: NavigateFunction) => [
    {
        category: '계정',
        items: [
            { label: '비밀번호 변경', path: '/settings/password' },
            { label: '이메일 변경', path: '/settings/email' },
        ],
    },
    {
        category: '기타',
        items: [
            { label: '정보 동의 설정' },
            { label: '회원 탈퇴', path: '/settings/delete' },
            {
                label: '로그아웃',
                onClick: async () => {
                    try {
                        await logout();
                    } catch (e) {
                        console.error('로그아웃 요청 실패', e);
                    } finally {
                        localStorage.removeItem('accessToken');
                        void navigate('/');
                    }
                },
            },
        ],
    },
];
