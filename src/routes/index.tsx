import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';
import QuizCommentary from '@/pages/article/QuizCommentaryPage';
import SharePage from '@/pages/article/SharePage';

import LoadingFallback from './LoadingFallback';
// import ProtectedRoute from './ProtectedRoute';

const EmailChangePage = lazy(() => import('@/pages/settings/EmailChangePage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ArticlePage = lazy(() => import('@/pages/article/ArticlePage'));
const MyPage = lazy(() => import('@/pages/my/MyPage'));
const CustomFeedPage = lazy(() => import('@/pages/custom-feed/CustomFeedPage'));
const SearchPage = lazy(() => import('@/pages/search/SearchPage'));
const PasswordChangePage = lazy(() => import('@/pages/settings/PasswordChangePage'));
const DeleteAccountPage = lazy(() => import('@/pages/settings/DeleteAccountPage'));
const EditProfilePage = lazy(() => import('@/pages/my/EditProfilePage'));

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
                    <Suspense fallback={<LoadingFallback />}>
                        <QuizCommentary />
                    </Suspense>
                ),
            },
            {
                path: 'articles/:articleId',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <ArticlePage />
                    </Suspense>
                ),
            },
            {
                path: 'mypage',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <MyPage />
                    </Suspense>
                ),
            },
            {
                path: 'custom-feed',
                element: (
                    // <ProtectedRoute isAuthenticated={false}>
                    <Suspense fallback={<LoadingFallback />}>
                        <CustomFeedPage />
                    </Suspense>
                    // </ProtectedRoute>
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
                    <Suspense fallback={<LoadingFallback />}>
                        <EditProfilePage />
                    </Suspense>
                ),
            },
            {
                path: '/settings/password',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <PasswordChangePage />
                    </Suspense>
                ),
            },
            {
                path: '/settings/email',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <EmailChangePage />
                    </Suspense>
                ),
            },
            {
                path: '/settings/delete',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <DeleteAccountPage />
                    </Suspense>
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
        ],
    },
];

export default routes;
