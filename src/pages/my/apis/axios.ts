import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        //임시로 직접 넣음
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MiwiZW1haWwiOiJteXBhZ2VAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTc1NDkxODczNSwiZXhwIjoxNzU0OTIwNTM1fQ.paPhryzLK-3jfz0Z08O1kCYutOqQlfYdim7wD1m0Hng `,
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
