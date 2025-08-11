// src/pages/my/apis/files.ts
import axiosInstance from '@/pages/my/apis/axios';

export interface UploadProfileResp {
    fileName: string;
    fileUrl: string; // ← 이걸 써서 이미지 표시
    originalFileName: string;
    fileSize: number;
}

export const uploadProfileImage = async (
    file: File,
    onProgress?: (pct: number) => void
): Promise<UploadProfileResp> => {
    const form = new FormData();
    form.append('file', file); // Swagger 상 필드명: file

    const res = await axiosInstance.post('/api/files/upload/profile', form, {
        onUploadProgress: (e) => {
            if (!onProgress || !e.total) return;
            onProgress(Math.round((e.loaded * 100) / e.total));
        },
        // Content-Type 수동 설정 X (브라우저가 boundary 포함해 자동 지정)
    });

    // 표준 응답 { isSuccess, result: {...} } 가정
    if (res.data?.isSuccess === false) {
        throw new Error(res.data?.message ?? '업로드 실패');
    }
    return res.data?.result as UploadProfileResp;
};
