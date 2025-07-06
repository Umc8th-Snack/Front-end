import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';

import LoadingFallback from './LoadingFallback';
import ProtectedRoute from './ProtectedRoute';

const HomePage = lazy(() => import('@/pages/home'));
const LoginPage = lazy(() => import('@/pages/login'));
const SignupPage = lazy(() => import('@/pages/signup'));
const ArticlePage = lazy(() => import('@/pages/article'));
const MyPage = lazy(() => import('@/pages/mypage'));

const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'login',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: 'signup',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <SignupPage />
                    </Suspense>
                ),
            },
            {
                path: 'article',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <ArticlePage />
                    </Suspense>
                ),
            },
            {
                path: 'mypage',
                element: (
                    <ProtectedRoute isAuthenticated={false}>
                        <Suspense fallback={<LoadingFallback />}>
                            <MyPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
        ],
    },
];

export default routes;
