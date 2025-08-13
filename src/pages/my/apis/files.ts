import axiosInstance from '@/pages/my/apis/axios';

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
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
            if (!onProgress || !e.total) return;
            onProgress(Math.round((e.loaded * 100) / e.total));
        },
    });

    if (res.data?.isSuccess === false) {
        throw new Error(res.data?.message ?? '업로드 실패');
    }
    return res.data?.result as UploadProfileResp;
};

/** 프로필 이미지 삭제: 성공/실패 판별**/
export const deleteProfileImage = async (fileUrl: string): Promise<void> => {
    const res = await axiosInstance.delete('/api/files/profile', { params: { fileUrl } });

    if (res.data?.isSuccess === false) {
        throw new Error(res.data?.message ?? '프로필 이미지 삭제 실패');
    }
    // 반환값 없음
};
