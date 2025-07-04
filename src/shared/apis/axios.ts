import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { API_CONFIG, API_TIMEOUT, CONTENT_TYPE } from '../constants/apiConstants';
import { handleRequestError, handleRequestSuccess } from '../utils/interceptors/requestInterceptor';
import { handleResponseError, handleResponseSuccess } from '../utils/interceptors/responseInterceptor';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': CONTENT_TYPE,
    },
    withCredentials: API_CONFIG.WITH_CREDENTIALS,
    maxRedirects: API_CONFIG.MAX_REDIRECTS,
});

// Request 인터셉터 등록
axiosInstance.interceptors.request.use(handleRequestSuccess, handleRequestError);

// Response 인터셉터 등록
axiosInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default axiosInstance;
