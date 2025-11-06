import type { AxiosResponse } from 'axios';

import type { ApiRequestOptionsTypes, ApiResponseTypes } from '../types/apiTypes';
import axiosInstance from './axios';

function extract<T>(response: AxiosResponse<any>): T {
    if (response.status === 204 || response.data == null || response.data === '') {
        return undefined as T;
    }
    const data = response.data as ApiResponseTypes<T>;
    if (!data.isSuccess) {
        throw new Error(data.message || 'API 요청 실패');
    }
    return data.result as T;
}

const api = {
    get: async <T = unknown>(url: string, options?: ApiRequestOptionsTypes): Promise<T> => {
        const res = await axiosInstance.get(url, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return extract<T>(res);
    },

    post: async <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptionsTypes): Promise<T> => {
        const res = await axiosInstance.post(url, data, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return extract<T>(res);
    },

    put: async <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptionsTypes): Promise<T> => {
        const res = await axiosInstance.put(url, data, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return extract<T>(res);
    },

    patch: async <T = unknown>(url: string, data?: unknown, options?: ApiRequestOptionsTypes): Promise<T> => {
        const res = await axiosInstance.patch(url, data, {
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return extract<T>(res);
    },

    delete: async <T = unknown>(url: string, options?: ApiRequestOptionsTypes): Promise<T> => {
        const res = await axiosInstance.delete(url, {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout,
        });
        return extract<T>(res);
    },
};

export default api;
