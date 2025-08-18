export const MY_QUERY_KEYS = {
    USER_PROFILE: ['userProfile'] as const,
    MEMOS: (page: number, size: number) => ['memos', { page, size }] as const,
    SCRAPS: (page: number, size: number) => ['scraps', { page, size }] as const,
};
