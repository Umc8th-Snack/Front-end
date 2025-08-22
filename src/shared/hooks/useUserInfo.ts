// src/shared/hooks/useUserInfo.ts
import { useQuery } from '@tanstack/react-query';

import { MY_QUERY_KEYS } from '@/pages/my/constants/queryConstants';

import { userApi, type UserInfoResponse } from '../apis/user';

export const useUserInfo = (enabled = true) => {
    return useQuery<UserInfoResponse, Error>({
        queryKey: MY_QUERY_KEYS.USER_PROFILE,
        queryFn: userApi.getMyInfo,
        enabled,
        staleTime: 5 * 60 * 1000, // 5분
        gcTime: 30 * 60 * 1000, // 30분
        retry: 1,
    });
};
