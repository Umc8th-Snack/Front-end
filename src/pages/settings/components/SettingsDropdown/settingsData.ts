import type { NavigateFunction } from 'react-router-dom';

export const getSettingsData = (navigate: NavigateFunction, handleLogout?: () => Promise<void>) => [
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
                onClick:
                    handleLogout ||
                    (async () => {
                        // 폴백: handleLogout이 전달되지 않은 경우
                        localStorage.removeItem('accessToken');
                        void navigate('/');
                    }),
            },
        ],
    },
];
