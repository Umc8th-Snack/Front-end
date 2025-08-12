import type { AxiosResponse } from 'axios';

import type { ApiRequestOptionsTypes, ApiResponseTypes } from '../types/apiTypes';
import axiosInstance from './axios';

/**
 * 기본 API 객체
 *
 * 사용 예시:
 * - GET: api.get<UserTypes[]>('/users')
 * - POST: api.post<UserTypes>('/users', userData)
 * - PUT: api.put<UserTypes>('/users/1', userData)
 * - DELETE: api.delete('/users/1')
 */
const api = {
    /**
     * GET 요청
     */
    get: async <T = unknown>(url: string, options?: ApiRequestOptionsTypes): Promise<T> => {
        const response: AxiosResponse<ApiResponseTypes<T>> = await axiosInstance.get(url, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data as T;
        /* 메모장 api 이슈 때문에 강제 타입 변환해놨는데 이따가 변경해야 함*/
    },

    /**
     * POST 요청
     */
    post: async <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptionsTypes): Promise<T> => {
        const response: AxiosResponse<ApiResponseTypes<T>> = await axiosInstance.post(url, data, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data as T;
    },

    /**
     * PUT 요청
     */
    put: async <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptionsTypes): Promise<T> => {
        const response: AxiosResponse<ApiResponseTypes<T>> = await axiosInstance.put(url, data, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data as T;
    },

    /**
     * PATCH 요청
     */
    patch: async <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptionsTypes): Promise<T> => {
        const response: AxiosResponse<ApiResponseTypes<T>> = await axiosInstance.patch(url, data, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data as T;
    },

    /**
     * DELETE 요청
     */
    delete: async <T = unknown>(url: string, options?: ApiRequestOptionsTypes): Promise<T> => {
        const response: AxiosResponse<ApiResponseTypes<T>> = await axiosInstance.delete(url, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return response.data as T;
    },
};

export default api;
