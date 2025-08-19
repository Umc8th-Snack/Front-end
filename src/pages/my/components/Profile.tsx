import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { deleteProfileImage, uploadProfileImage } from '@/pages/my/apis/files';
import { fetchUserProfile, updateUserProfile } from '@/pages/my/apis/user';
import DefaultImage from '@/pages/my/assets/default-image.svg?react';
import ProfileDeleteButton from '@/pages/my/assets/profileDeleteButton.svg?react';
import { MY_QUERY_KEYS } from '@/pages/my/constants/queryConstants';

const MAX_MB = 5;
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

const getErrorMessage = (err: unknown) => {
    if (isAxiosError(err)) return (err.response?.data as any)?.message ?? err.message;
    if (err instanceof Error) return err.message;
    return '오류가 발생했어요.';
};

const Profile = () => {
    const qc = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        data: profile,
        isLoading,
        isError,
    } = useQuery({
        queryKey: MY_QUERY_KEYS.USER_PROFILE,
        queryFn: fetchUserProfile,
    });

    const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
    const [isUploading, setUploading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [showDefault, setShowDefault] = useState(false);

    useEffect(() => {
        setLocalImageUrl(null);
        if (profile?.profileImage) setImageError(false);
    }, [profile?.profileImage]);

    const currentImage = showDefault ? null : (localImageUrl ?? profile?.profileImage ?? null);
    const isDefaultView = showDefault || imageError || !currentImage;

    const openPicker = () => fileInputRef.current?.click();

    const onFileChange = async (file?: File) => {
        if (!file) return;

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

            const result = await uploadProfileImage(file, setProgress);
            await updateUserProfile({ profileImage: result.fileUrl });

            const bust = `?_=${Date.now()}`;
            setLocalImageUrl(result.fileUrl + bust);
            setShowDefault(false);
            setImageError(false);

            qc.setQueryData(MY_QUERY_KEYS.USER_PROFILE, (prev: any) =>
                prev ? { ...prev, profileImage: result.fileUrl } : prev
            );
            void qc.invalidateQueries({ queryKey: MY_QUERY_KEYS.USER_PROFILE });
        } catch (err: unknown) {
            alert(getErrorMessage(err));
        } finally {
            setUploading(false);
            setProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDeleteImage = async () => {
        if (isDefaultView) return;
        const ok = confirm('프로필 사진을 삭제하시겠어요?');
        if (!ok || !currentImage) return;

        try {
            setDeleting(true);
            setShowDefault(true);
            setLocalImageUrl(null);
            setImageError(true);

            await deleteProfileImage(currentImage);
            void qc.invalidateQueries({ queryKey: MY_QUERY_KEYS.USER_PROFILE });
        } catch (err: unknown) {
            setShowDefault(false);
            setImageError(false);
            alert(getErrorMessage(err));
        } finally {
            setDeleting(false);
        }
    };

    if (isLoading) return <div className="mb-8">프로필 불러오는 중...</div>;
    if (isError) return <div className="mb-8 text-red-500">프로필 조회 실패</div>;

    return (
        <div className="mb-8 text-left md:text-center">
            {/* 헤더: 모바일=가로 한줄, 데스크탑=세로(원래 레이아웃) */}
            <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-0">
                {/* 아바타 + 삭제 */}
                <div className="relative h-16 w-16 shrink-0 md:mt-4 md:h-[104px] md:w-[104px]">
                    <button
                        type="button"
                        onClick={openPicker}
                        className="h-full w-full overflow-hidden rounded-full ring-1 ring-black/10 hover:ring-black/20 focus:outline-none"
                        title="프로필 사진 변경"
                        aria-label="프로필 사진 변경"
                        disabled={isUploading || isDeleting}
                    >
                        {isDefaultView ? (
                            <DefaultImage />
                        ) : (
                            <img
                                src={currentImage!}
                                alt="프로필 이미지"
                                className="h-full w-full object-cover"
                                onError={() => setImageError(true)}
                                draggable={false}
                            />
                        )}
                    </button>

                    {/* 삭제 버튼 */}
                    {!isDefaultView && (
                        <button
                            type="button"
                            onClick={() => void handleDeleteImage()}
                            className="absolute -top-2 -right-2 rounded-full p-0.5 focus:outline-none disabled:opacity-50 md:p-1"
                            title="프로필 사진 삭제"
                            aria-label="프로필 사진 삭제"
                            disabled={isUploading || isDeleting}
                        >
                            <ProfileDeleteButton className="h-6 w-6 md:h-7 md:w-7" />
                        </button>
                    )}
                </div>

                {/* 닉네임/이메일: 모바일 작게 왼쪽 정렬, 데스크탑 원래 크기 & 중앙 정렬 */}
                <div className="min-w-0 flex-1 text-left">
                    <div className="md:text-36px-semibold truncate text-base font-semibold text-black md:mt-4">
                        {profile?.nickname}
                    </div>
                    <div className="text-black-70 md:text-24px-medium truncate text-xs">{profile?.email}</div>
                </div>
            </div>

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
                <div className="mt-2 w-40 md:mx-auto md:w-[104px]">
                    <div className="h-1 w-full overflow-hidden rounded bg-gray-200">
                        <div className="h-full rounded bg-black transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="mt-1 text-[11px] text-gray-600">{progress}%</p>
                </div>
            )}

            {/* 소개 + 프로필 편집 버튼 */}
            <div className="mt-4 flex w-full items-end justify-between gap-3 md:mt-6">
                <p className="text-black-30 md:text-20px-medium min-w-0 flex-1 text-left text-sm break-all whitespace-pre-line md:break-words">
                    {profile?.introduction || '소개글을 작성해보세요!'}
                </p>

                <Link
                    to="/mypage/edit-profile"
                    className="bg-main md:text-18px-medium inline-flex shrink-0 cursor-pointer items-center justify-center self-end rounded-[8px] px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 md:px-4 md:py-2"
                >
                    프로필 편집
                </Link>
            </div>
            <div className="bg-black-30 mt-2 h-px w-full" />
        </div>
    );
};

export default Profile;
