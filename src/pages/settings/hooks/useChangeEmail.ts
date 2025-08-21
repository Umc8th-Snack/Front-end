import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/shared/apis/auth';

import type { ChangeEmailPayload, ChangeEmailResult } from '../types/types';

const USER_PROFILE_QUERY_KEY = ['user', 'profile'];

export const useChangeEmail = () => {
    const qc = useQueryClient();

    return useMutation<ChangeEmailResult, Error, ChangeEmailPayload>({
        mutationFn: authApi.changeEmail,
        onSuccess: async () => {
            // 프로필에 이메일이 들어있다면 invalidate해서 갱신
            await qc.invalidateQueries({ queryKey: USER_PROFILE_QUERY_KEY });
        },
    });
};
