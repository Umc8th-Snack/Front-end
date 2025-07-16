export const ROUTES = {
    HOME: '/',
    ARTICLE: '/article',
    MY_PAGE: '/mypage',
    CUSTOM_FEED: '/custom-feed',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface RouteParams {
    id?: string;
}

export interface LocationState {
    from?: string;
}
