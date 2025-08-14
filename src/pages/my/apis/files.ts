import type { AxiosProgressEvent } from 'axios';

import axiosInstance from '@/shared/apis/axios';

export interface UploadProfileResp {
    fileName: string;
    fileUrl: string;
    originalFileName: string;
    fileSize: number;
}

export const uploadProfileImage = async (
    file: File,
    onProgress?: (pct: number) => void
): Promise<UploadProfileResp> => {
    const form = new FormData();
    form.append('file', file);

    const res = await axiosInstance.post('/api/files/upload/profile', form, {
        // Content-Type 생략: 브라우저가 multipart/form-data; boundary=... 자동 설정
        onUploadProgress: (e: AxiosProgressEvent) => {
            if (!onProgress) return;
            // e.total이 없을 수도 있어(progress 제공 시 사용)
            if (typeof e.progress === 'number') {
                onProgress(Math.round(e.progress * 100));
            } else if (e.total) {
                onProgress(Math.round((e.loaded * 100) / e.total));
            }
        },
    });

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '업로드 실패');
    }
    return res.data.result as UploadProfileResp;
};

/** 프로필 이미지 삭제 */
export const deleteProfileImage = async (fileUrl: string): Promise<void> => {
    const res = await axiosInstance.delete('/api/files/profile', { params: { fileUrl } });

    if (!res.data?.isSuccess) {
        throw new Error(res.data?.message ?? '프로필 이미지 삭제 실패');
    }
    // 성공 시 반환값 없음
};
