import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { userApi, type UserInfoResponse } from '../apis/user';

/**
 * 사용자 정보 조회 query hook
 * - 로그인 상태에서만 사용
 * - staleTime: 5분 (사용자 정보는 자주 변경되지 않음)
 */
export const useUserInfo = (enabled = true) => {
    return useQuery<UserInfoResponse, Error>({
        queryKey: ['user', 'me'],
        queryFn: userApi.getMyInfo,
        enabled, // 로그인 상태일 때만 실행
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 30 * 60 * 1000, // 30분 (이전 cacheTime)
        retry: 1, // 실패 시 1회만 재시도
    });
};

/**
 * 사용자 정보 수정 mutation hook
 */
export const useUpdateUserInfo = () => {
    const queryClient = useQueryClient();

    return useMutation<UserInfoResponse, Error, Partial<UserInfoResponse>>({
        mutationFn: userApi.updateMyInfo,
        onSuccess: (data) => {
            console.log('✅ [USE UPDATE USER] 사용자 정보 수정 성공:', data);
            // 사용자 정보 쿼리 무효화 및 새 데이터로 업데이트
            queryClient.setQueryData(['user', 'me'], data);
            void queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('❌ [USE UPDATE USER] 사용자 정보 수정 실패:', error);
        },
    });
};

/**
 * 비밀번호 변경 mutation hook
 */
export const useChangePassword = () => {
    return useMutation<
        void,
        Error,
        {
            currentPassword: string;
            newPassword: string;
            confirmPassword: string;
        }
    >({
        mutationFn: userApi.changePassword,
        onSuccess: () => {
            console.log('✅ [USE CHANGE PASSWORD] 비밀번호 변경 성공');
            alert('비밀번호가 성공적으로 변경되었습니다.');
        },
        onError: (error) => {
            console.error('❌ [USE CHANGE PASSWORD] 비밀번호 변경 실패:', error);
            alert('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.');
        },
    });
};

/**
 * 회원 탈퇴 mutation hook
 */
export const useWithdraw = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: userApi.withdraw,
        onSuccess: () => {
            console.log('✅ [USE WITHDRAW] 회원 탈퇴 성공');
            // 모든 캐시 초기화
            queryClient.clear();
            // 로컬 스토리지 정리
            localStorage.clear();
            // 홈으로 리다이렉트
            window.location.href = '/';
        },
        onError: (error) => {
            console.error('❌ [USE WITHDRAW] 회원 탈퇴 실패:', error);
            alert('회원 탈퇴에 실패했습니다. 비밀번호를 확인해주세요.');
        },
    });
};

type ChangeEmailVars = { newEmail: string; currentPassword: string }; // ← password → currentPassword 로 변경
type ApiErrorBody = {
    code: string;
    message: string;
    error?: string;
};

export const useChangeEmail = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ApiErrorBody>, ChangeEmailVars>({
        mutationFn: userApi.changeEmail,
        onSuccess: (_data, variables) => {
            queryClient.setQueryData<UserInfoResponse>(['user', 'me'], (prev) =>
                prev ? { ...prev, email: variables.newEmail } : prev
            );
            void queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
        },
        onError: (err) => {
            const code = err.response?.data?.code;
            const msg = err.response?.data?.message;
            console.error('[useChangeEmail] error:', code, msg, err);
        },
    });
};
