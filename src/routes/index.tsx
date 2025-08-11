import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';

import MainLayout from '@/layout/MainLayout';

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
const AccordionTestPage = lazy(() => import('@/pages/test/AccordionTestPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/forgot-password/ForgotPasswordPage'));
const QuizCommentary = lazy(() => import('@/pages/test/QuizCommentaryPage'));

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
                path: 'article/quiz-commentary',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <QuizCommentary />
                    </Suspense>
                ),
            },
            {
                path: 'article/:id?',
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
                path: 'accordion-test',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <AccordionTestPage />
                    </Suspense>
                ),
            },
            {
                path: 'forgot-password',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <ForgotPasswordPage />
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
        ],
    },
];

export default routes;
