import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        //임시로 직접 넣음
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MTIsImVtYWlsIjoibXlwYWdldGVzdEBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzU0NTk0OTgyLCJleHAiOjE3NTQ1OTY3ODJ9.GAP6b3e1A1r_xMTjGPikwN1jJuLy5olyiSLFlvXIaEA`,
    },
});

//로컬 스토리지 사용 (로그인 기능 추가 후 변경 필요?)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default axiosInstance;
