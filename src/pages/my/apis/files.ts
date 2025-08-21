import type { AxiosProgressEvent } from 'axios';

import api from '@/shared/apis/api';
import axiosInstance from '@/shared/apis/axios';

// 업로드 결과 타입 (Swagger 스펙)
export interface UploadProfileResult {
    fileName: string;
    fileUrl: string;
    originalFileName: string;
    fileSize: number;
}

/**
 * 프로필 이미지 업로드
 * - POST /api/files/upload/profile
 * - 필드명: file
 * - 허용: JPEG/JPG/PNG/GIF/WEBP, 최대 5MB
 * - Content-Type 지정 금지 (브라우저가 boundary 자동 설정)
 */
export const uploadProfileImage = async (
    file: File,
    onProgress?: (pct: number) => void
): Promise<UploadProfileResult> => {
    const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!ALLOWED.includes(file.type)) throw new Error('JPEG/JPG/PNG/GIF/WEBP만 업로드 가능합니다.');
    if (file.size > 5 * 1024 * 1024) throw new Error('파일 크기는 5MB 이하만 허용됩니다.');

    const form = new FormData();
    form.append('file', file);

    try {
        // 파일 업로드는 progress 추적이 필요해 axiosInstance 직접 사용
        const res = await axiosInstance.post('/api/files/upload/profile', form, {
            headers: { Accept: '*/*' },
            onUploadProgress: (e: AxiosProgressEvent) => {
                if (onProgress && typeof e.total === 'number' && e.total > 0) {
                    onProgress(Math.round((e.loaded / e.total) * 100));
                }
            },
        });

        if (!res.data?.isSuccess) {
            throw new Error(res.data?.message ?? '프로필 이미지 업로드 실패');
        }
        return res.data.result as UploadProfileResult;
    } catch (err: any) {
        const status = err?.response?.status;
        const data = err?.response?.data;
        console.error('[upload profile error]', status, data);
        throw new Error(
            (typeof data === 'string' ? data : data?.message) ??
                err?.message ??
                '프로필 이미지 업로드 중 오류가 발생했습니다.'
        );
    }
};

/**
 * 프로필 이미지 삭제
 * - DELETE /api/files/profile?fileUrl=...
 *   (백엔드 스펙에 따라 경로/쿼리키가 다르면 여기를 맞춰주세요)
 */
export const deleteProfileImage = async (fileUrl: string): Promise<void> => {
    try {
        await api.delete<void>('/api/files/profile', {
            params: { fileUrl },
            headers: { Accept: '*/*' },
        });
    } catch (err: any) {
        const status = err?.response?.status;
        const data = err?.response?.data;
        console.error('[delete profile image error]', status, data);
        throw new Error(
            (typeof data === 'string' ? data : data?.message) ??
                err?.message ??
                '프로필 이미지 삭제 중 오류가 발생했습니다.'
        );
    }
};
