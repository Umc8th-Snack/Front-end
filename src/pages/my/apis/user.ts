import axios from 'axios';

import type { UserProfile } from '@/pages/my/types/types';

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MTIsImVtYWlsIjoibXlwYWdldGVzdEBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzU0NTg3Njc1LCJleHAiOjE3NTQ1ODk0NzV9.c0rMv34ILpAUR0kQm_LZpr8n48mMSaWpf-QdirY9SaQ',
        },
    });
    return res.data.result;
};
