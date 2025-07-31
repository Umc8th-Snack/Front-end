import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';

import LoadingFallback from './LoadingFallback';
import ProtectedRoute from './ProtectedRoute';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ArticlePage = lazy(() => import('@/pages/article/ArticlePage'));
const MyPage = lazy(() => import('@/pages/my/MyPage'));
const CustomFeedPage = lazy(() => import('@/pages/custom-feed/CustomFeedPage'));
const SearchPage = lazy(() => import('@/pages/search/SearchPage'));
const PasswordChangePage = lazy(() => import('@/pages/password-change/PasswordChangePage'));
const DeleteAccountPage = lazy(() => import('@/pages/delete-account/DeleteAccountPage'));
const AccordionTestPage = lazy(() => import('@/pages/test/AccordionTestPage'));

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
            {
                path: 'custom-feed',
                element: (
                    <ProtectedRoute isAuthenticated={false}>
                        <Suspense fallback={<LoadingFallback />}>
                            <CustomFeedPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'password-change',
                element: (
                    <ProtectedRoute isAuthenticated={false}>
                        <Suspense fallback={<LoadingFallback />}>
                            <PasswordChangePage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'delete-account',
                element: (
                    <ProtectedRoute isAuthenticated={false}>
                        <Suspense fallback={<LoadingFallback />}>
                            <DeleteAccountPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'search',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <SearchPage />
                    </Suspense>
                ),
            },
            {
                path: 'accordion-test',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AccordionTestPage />
                    </Suspense>
                ),
            },
        ],
    },
];

export default routes;
