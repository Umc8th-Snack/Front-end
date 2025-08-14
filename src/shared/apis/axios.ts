// src/shared/apis/axios.ts
import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { API_CONFIG, API_TIMEOUT } from '../constants/apiConstants';
import { handleRequestError, handleRequestSuccess } from '../utils/interceptors/requestInterceptor';
import { handleResponseError, handleResponseSuccess } from '../utils/interceptors/responseInterceptor';

// ⚠️ 전역 Content-Type 제거 (중요)
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: API_CONFIG.WITH_CREDENTIALS,
    maxRedirects: API_CONFIG.MAX_REDIRECTS,
});

axiosInstance.interceptors.request.use(handleRequestSuccess, handleRequestError);
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default axiosInstance;
