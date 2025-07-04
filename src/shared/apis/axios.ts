import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

import type { ApiErrorTypes, CustomAxiosErrorTypes } from '../types/apiTypes';

// 상수 정의
const API_TIMEOUT = 10000; // 10초
const CONTENT_TYPE = 'application/json';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': CONTENT_TYPE,
    },
});

// Request 인터셉터
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // TODO: 토큰이 필요한 경우 여기에 추가
        // const token = getAccessToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        // 개발 환경에서 요청 로깅
        if (import.meta.env.DEV) {
            console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response 인터셉터
axiosInstance.interceptors.response.use(
    (response) => {
        // 개발 환경에서 응답 로깅
        if (import.meta.env.DEV) {
            console.log(`[API Response] ${response.config.url}`, response.data);
        }

        return response;
    },
    (error: AxiosError<ApiErrorTypes>) => {
        // 에러 타입 확장
        const customError = error as CustomAxiosErrorTypes;
        customError.isApiError = true;

        // 에러 상태별 처리
        if (error.response) {
            // 서버 응답이 있는 경우
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // TODO: 토큰 갱신 로직 또는 로그인 페이지로 이동
                    console.error('인증이 필요합니다.');
                    break;
                case 403:
                    console.error('접근 권한이 없습니다.');
                    break;
                case 404:
                    console.error('요청한 리소스를 찾을 수 없습니다.');
                    break;
                case 500:
                    console.error('서버 오류가 발생했습니다.');
                    break;
                default:
                    console.error(`API 오류: ${data?.message || '알 수 없는 오류'}`);
            }
        } else if (error.request) {
            // 요청은 보냈지만 응답을 받지 못한 경우
            console.error('네트워크 오류가 발생했습니다.');
        } else {
            // 요청 설정 중 오류가 발생한 경우
            console.error('요청 설정 중 오류가 발생했습니다.');
        }

        return Promise.reject(customError);
    }
);

export default axiosInstance;
