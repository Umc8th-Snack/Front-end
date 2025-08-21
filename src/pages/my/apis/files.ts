import type { AxiosProgressEvent } from 'axios';

import axiosInstance from '@/shared/apis/axios';

import type { ApiEnvelope, UploadProfileResult } from '../types/types';
// 이미지 압축 함수
const compressImage = (file: File, maxWidth = 1024, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const img = new Image();

        img.onload = () => {
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    const compressedFile = new File([blob!], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                file.type,
                quality
            );
        };

        img.src = URL.createObjectURL(file);
    });
};

// 모바일 감지 함수
const isMobile = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * 프로필 이미지 업로드 (이미지 압축 기능 포함)
 * - POST /api/files/upload/profile
 * - 필드명: file
 * - 허용: JPEG/JPG/PNG/GIF/WEBP, 최대 5MB
 * - 큰 이미지는 자동 압축
 */
export const uploadProfileImage = async (
    file: File,
    onProgress?: (pct: number) => void
): Promise<UploadProfileResult> => {
    const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!ALLOWED.includes(file.type)) {
        throw new Error('JPEG/JPG/PNG/GIF/WEBP만 업로드 가능합니다.');
    }

    let processedFile = file;

    // 모바일과 데스크톱 동일한 파일 크기 제한
    const maxSize = 5 * 1024 * 1024; // 5MB

    // 파일이 너무 크면 압축 시도
    if (file.size > maxSize) {
        if (file.type.startsWith('image/')) {
            try {
                processedFile = await compressImage(file);
                console.log(`File compressed: ${file.size} -> ${processedFile.size}`);
            } catch (error) {
                console.error('Image compression failed:', error);
            }
        }

        // 압축 후에도 크면 에러
        if (processedFile.size > maxSize) {
            throw new Error('파일 크기는 5MB 이하만 허용됩니다.');
        }
    }

    const form = new FormData();
    form.append('file', processedFile);

    try {
        const config = {
            headers: {
                Accept: '*/*',
                // CORS 문제로 인해 추가 헤더 제거
                // Cache-Control, X-Requested-With 헤더는 백엔드에서 허용하지 않음
            },
            timeout: isMobile() ? 30000 : 15000, // 모바일에서는 타임아웃을 더 길게
            onUploadProgress: (e: AxiosProgressEvent) => {
                if (onProgress && typeof e.total === 'number' && e.total > 0) {
                    onProgress(Math.round((e.loaded / e.total) * 100));
                }
            },
        };

        console.log('[Upload Info]', {
            originalSize: file.size,
            processedSize: processedFile.size,
            isMobile: isMobile(),
            userAgent: navigator.userAgent,
        });

        const res = await axiosInstance.post<ApiEnvelope<UploadProfileResult>>(
            '/api/files/upload/profile',
            form,
            config
        );

        if (!res.data?.isSuccess) {
            throw new Error(res.data?.message ?? '프로필 이미지 업로드 실패');
        }

        return res.data.result;
    } catch (err: any) {
        const status = err?.response?.status;
        const data = err?.response?.data;

        // 상세한 에러 로깅
        console.error('[Upload Profile Error]', {
            status,
            data,
            message: err?.message,
            code: err?.code,
            config: err?.config,
            isMobile: isMobile(),
            fileSize: processedFile.size,
            fileName: processedFile.name,
        });

        // 에러 메시지 개선
        let errorMessage = '프로필 이미지 업로드 중 오류가 발생했습니다.';

        if (err?.code === 'NETWORK_ERROR' || err?.code === 'ERR_NETWORK') {
            errorMessage = '네트워크 연결을 확인하고 다시 시도해주세요.';
        } else if (err?.code === 'ERR_INTERNET_DISCONNECTED') {
            errorMessage = '인터넷 연결이 끊어졌습니다.';
        } else if (status === 413 || err?.message?.includes('too large')) {
            errorMessage = '파일이 너무 큽니다. 더 작은 이미지를 선택해주세요.';
        } else if (status === 0) {
            errorMessage = '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.';
        } else if (status === 502 || status === 503) {
            errorMessage = '서버가 일시적으로 사용할 수 없습니다.';
        } else if (typeof data === 'string') {
            errorMessage = data;
        } else if (data?.message) {
            errorMessage = data.message;
        } else if (err?.message && !err.message.includes('Network Error')) {
            errorMessage = err.message;
        }

        throw new Error(errorMessage);
    }
};

/**
 * 프로필 이미지 삭제
 * - DELETE /api/files/profile?fileUrl=...
 */
export const deleteProfileImage = async (fileUrl: string): Promise<void> => {
    try {
        const res = await axiosInstance.delete<ApiEnvelope<unknown>>('/api/files/profile', {
            params: { fileUrl },
            headers: { Accept: '*/*' },
        });
        if (!res.data?.isSuccess) {
            throw new Error(res.data?.message ?? '프로필 이미지 삭제 실패');
        }
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
