export const ROUTES = {
    HOME: '/',
    ARTICLE: '/article',
    MY_PAGE: '/mypage',
    CUSTOM_FEED: '/custom-feed',
    SEARCH: '/search',
    PASSWORD_CHANGE: '/password-change',
    DELETE_ACCOUNT: '/delete-account',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface RouteParams {
    id?: string;
}

export interface LocationState {
    from?: string;
}
