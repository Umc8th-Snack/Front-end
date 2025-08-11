// src/pages/my/components/Profile.tsx
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { uploadProfileImage } from '@/pages/my/apis/files';
import { fetchUserProfile, updateUserProfile } from '@/pages/my/apis/user';
import DefaultImage from '@/pages/my/assets/default-image.svg?react';
import { QUERY_KEYS } from '@/pages/my/constants/queryConstants';

const MAX_MB = 5;
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

const Profile = () => {
    const qc = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        data: profile,
        isLoading,
        isError,
    } = useQuery({
        queryKey: QUERY_KEYS.USER_PROFILE,
        queryFn: fetchUserProfile,
    });

    // 업로드 직후 화면에 즉시 반영하기 위한 로컬 상태
    const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
    const [isUploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // 서버에서 새 값이 오면 로컬 미리보기 초기화
    useEffect(() => {
        setLocalImageUrl(null);
    }, [profile?.profileImage]);

    const currentImage = localImageUrl ?? profile?.profileImage ?? null;

    const openPicker = () => fileInputRef.current?.click();

    const onFileChange = async (file?: File) => {
        if (!file) return;

        // 간단 검증 (확장자/용량)
        if (!ALLOWED.includes(file.type)) {
            alert('JPG, JPEG, PNG, GIF, WEBP만 업로드 가능해요.');
            return;
        }
        if (file.size > MAX_MB * 1024 * 1024) {
            alert(`파일 크기는 최대 ${MAX_MB}MB까지 가능합니다.`);
            return;
        }

        try {
            setUploading(true);
            setProgress(0);

            // 1) 파일 업로드 (S3) → fileUrl 획득
            const result = await uploadProfileImage(file, setProgress); // result.fileUrl

            // 2) 내 정보 수정 API로 프로필 이미지 URL 저장
            await updateUserProfile({ profileImage: result.fileUrl });

            // 3) 화면 즉시 반영 + 서버 데이터 갱신
            setLocalImageUrl(result.fileUrl);
            void qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
        } catch (e: any) {
            const msg = e?.response?.data?.message ?? e?.message ?? '업로드 중 오류가 발생했어요.';
            alert(msg);
        } finally {
            setUploading(false);
            setProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (isLoading) return <div className="mb-8">프로필 불러오는 중...</div>;
    if (isError) return <div className="mb-8 text-red-500">프로필 조회 실패</div>;

    return (
        <div className="mb-8 flex flex-col items-start text-center">
            {/* 아바타 (클릭 → 파일 선택) */}
            <button
                type="button"
                onClick={openPicker}
                className="mt-4 h-[104px] w-[104px] overflow-hidden rounded-full ring-1 ring-black/10 hover:ring-black/20 focus:outline-none"
                title="프로필 사진 변경"
            >
                {currentImage ? (
                    <img
                        src={currentImage}
                        alt="프로필 이미지"
                        className="h-full w-full object-cover"
                        onError={() => {
                            console.error('프로필 이미지 로드 실패:', currentImage);
                            setLocalImageUrl(null);
                        }}
                    />
                ) : (
                    <DefaultImage />
                )}
            </button>

            {/* 숨겨진 파일 입력 */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => void onFileChange(e.target.files?.[0])}
            />

            {/* 업로드 진행률 */}
            {isUploading && (
                <div className="mt-2 w-[104px]">
                    <div className="h-1 w-full overflow-hidden rounded bg-gray-200">
                        <div className="h-full rounded bg-black transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-gray-600">{progress}%</p>
                </div>
            )}

            <div className="text-36px-semibold mt-4 text-black">{profile?.nickname}</div>
            <div className="text-24px-medium text-black-70">{profile?.email}</div>

            <div className="mt-6 flex w-full items-end justify-between gap-4 text-left">
                <p className="text-20px-medium text-black-30 flex-1 break-words">
                    {profile?.introduction || '소개글을 작성해보세요!'}
                </p>

                <Link to="/mypage/edit-profile">
                    <button className="bg-main text-18px-medium cursor-pointer rounded-[8px] px-4 py-2 text-white hover:bg-blue-700">
                        프로필 편집
                    </button>
                </Link>
            </div>

            <div className="bg-black-30 mt-2 h-[1px] w-full" />
        </div>
    );
};

export default Profile;
