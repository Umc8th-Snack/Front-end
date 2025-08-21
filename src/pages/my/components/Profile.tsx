// src/pages/my/components/Profile.tsx
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { deleteProfileImage, uploadProfileImage } from '@/pages/my/apis/files';
import DefaultImage from '@/pages/my/assets/default-image.svg?react';
import ProfileDeleteButton from '@/pages/my/assets/profileDeleteButton.svg?react';
import { QUERY_KEYS } from '@/pages/my/constants/queryConstants';
import { userApi } from '@/shared/apis/user';

const MAX_MB = 5;
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// 공통 에러 메시지 추출기
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
        queryKey: QUERY_KEYS.USER_PROFILE,
        queryFn: userApi.getMyInfo,
    });

    // 업로드/삭제에 따른 즉시 반영용 로컬 상태
    const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
    const [isUploading, setUploading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [progress, setProgress] = useState(0);

    // 이미지 로드 실패 시 기본이미지로 전환
    const [imageError, setImageError] = useState(false);

    // 서버가 여전히 삭제된 fileUrl을 내려줘도, 강제로 기본이미지를 보여주기 위한 락
    const [showDefault, setShowDefault] = useState(false);

    // 서버에서 새 값이 오면 미리보기 초기화(기본이미지 락은 건드리지 않음)
    useEffect(() => {
        setLocalImageUrl(null);
        if (profile?.profileImage) {
            // 서버가 유효한 URL을 내려줄 때만 에러 플래그 해제
            setImageError(false);
        }
    }, [profile?.profileImage]);

    // 기본이미지 강제락이 켜져 있으면 무조건 기본이미지
    const currentImage = showDefault ? null : (localImageUrl ?? profile?.profileImage ?? null);
    const isDefaultView = showDefault || imageError || !currentImage;

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

            // 1) 업로드 → fileUrl 획득
            const result = await uploadProfileImage(file, setProgress);

            // 2) 내 정보 수정 API로 프로필 이미지 URL 저장
            await userApi.updateMyInfo({ profileImage: result.fileUrl });

            // 3) 즉시 반영(캐시 버스터로 캐시 무효화) + 기본이미지 락 해제
            const bust = `?_=${Date.now()}`;
            setLocalImageUrl(result.fileUrl + bust);
            setShowDefault(false);
            setImageError(false);

            // 4) 캐시 즉시 갱신 + 재검증
            qc.setQueryData(QUERY_KEYS.USER_PROFILE, (prev: any) =>
                prev ? { ...prev, profileImage: result.fileUrl } : prev
            );
            void qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
        } catch (err: unknown) {
            alert(getErrorMessage(err));
        } finally {
            setUploading(false);
            setProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // 삭제: 서버 구조상 profileImage는 계속 같은 URL을 줄 수 있으므로
    // showDefault 락으로 무조건 기본이미지를 강제 표시
    const handleDeleteImage = async () => {
        if (isDefaultView) return; // 기본이미지 상태라면 삭제 불필요
        const ok = confirm('프로필 사진을 삭제하시겠어요?');
        if (!ok || !currentImage) return;

        try {
            setDeleting(true);

            // ① 즉시 기본이미지로 전환 (락 활성화)
            setShowDefault(true);
            setLocalImageUrl(null);
            setImageError(true);

            // ② 스토리지/백엔드에서 파일 삭제
            await deleteProfileImage(currentImage);

            // ③ 서버 재조회(화면은 showDefault로 고정이므로 흔들리지 않음)
            void qc.invalidateQueries({ queryKey: QUERY_KEYS.USER_PROFILE });
        } catch (err: unknown) {
            // 실패 시 락 해제 & 원복
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
        <div className="mb-8 flex flex-col items-start text-center">
            {/* 아바타 (클릭 → 파일 선택) + 삭제 버튼 */}
            <div className="relative mt-4 h-[104px] w-[104px]">
                {/* 프로필 이미지 버튼 */}
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
                            onError={() => setImageError(true)} // 로드 실패 → 기본이미지 전환
                            draggable={false}
                        />
                    )}
                </button>

                {/* 삭제 버튼: 기본이미지일 땐 숨김 */}
                {!isDefaultView && (
                    <button
                        type="button"
                        onClick={() => void handleDeleteImage()}
                        className="absolute -top-2 -right-2 rounded-full p-1 focus:outline-none disabled:opacity-50"
                        title="프로필 사진 삭제"
                        aria-label="프로필 사진 삭제"
                        disabled={isUploading || isDeleting}
                    >
                        <ProfileDeleteButton className="h-7 w-7" />
                    </button>
                )}
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

                <Link
                    to="/mypage/edit-profile"
                    className="bg-main text-18px-medium inline-flex cursor-pointer items-center justify-center rounded-[8px] px-4 py-2 text-white hover:bg-blue-700"
                >
                    프로필 편집
                </Link>
            </div>

            <div className="bg-black-30 mt-2 h-[1px] w-full" />
        </div>
    );
};

export default Profile;
