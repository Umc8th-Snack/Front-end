import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';
import QuizCommentary from '@/pages/article/QuizCommentaryPage';
import SharePage from '@/pages/article/SharePage';

import LoadingFallback from './LoadingFallback';
import ProtectedRoute from './ProtectedRoute';

const EmailChangePage = lazy(() => import('@/pages/settings/EmailChangePage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ArticlePage = lazy(() => import('@/pages/article/ArticlePage'));
const MyPage = lazy(() => import('@/pages/my/MyPage'));
const CustomFeedPage = lazy(() => import('@/pages/custom-feed/CustomFeedPage'));
const SearchPage = lazy(() => import('@/pages/search/SearchPage'));
const PasswordChangePage = lazy(() => import('@/pages/settings/PasswordChangePage'));
const DeleteAccountPage = lazy(() => import('@/pages/settings/DeleteAccountPage'));
const EditProfilePage = lazy(() => import('@/pages/my/EditProfilePage'));
const AuthSuccessPage = lazy(() => import('@/pages/auth/AuthSuccessPage'));

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
                path: 'articles/quiz-commentary',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <QuizCommentary />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'articles/:articleId',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <ArticlePage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'mypage',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <MyPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'custom-feed',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <CustomFeedPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'password-change',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <PasswordChangePage />
                    </Suspense>
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
                path: '/mypage/edit-profile',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <EditProfilePage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/settings/password',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <PasswordChangePage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/settings/email',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <EmailChangePage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/settings/delete',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                            <DeleteAccountPage />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/share/:uuid',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <SharePage />
                    </Suspense>
                ),
            },
            {
                path: '/auth/success',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AuthSuccessPage />
                    </Suspense>
                ),
            },
        ],
    },
];

export default routes;
