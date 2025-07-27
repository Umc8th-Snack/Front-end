export const settingsData = [
    // TODO: 추후 path를 실제 페이지 또는 기능으로 변경 필요
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
            { label: '정보 동의 설정', path: '/settings/privacy' },
            { label: '회원 탈퇴', path: '/settings/delete' },
            { label: '로그아웃', onClick: () => console.log('로그아웃') },
        ],
    },
];
