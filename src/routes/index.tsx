import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';

import LoadingFallback from './LoadingFallback';
import ProtectedRoute from './ProtectedRoute';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const SignupPage = lazy(() => import('@/pages/signup/SignupPage'));
const ArticlePage = lazy(() => import('@/pages/article/ArticlePage'));
const MyPage = lazy(() => import('@/pages/my-page/MyPage'));

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
