export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    ARTICLE: '/article',
    MY_PAGE: '/mypage',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface RouteParams {
    id?: string;
}

export interface LocationState {
    from?: string;
}
