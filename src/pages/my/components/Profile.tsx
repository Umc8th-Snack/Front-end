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

    // 파일 선택 개선 (모바일에서 카메라/갤러리 선택 지원, 데스크탑에서도 정상 동작)
    const openPicker = () => {
        if (fileInputRef.current) {
            // 모든 환경에서 이미지 파일 선택 가능
            fileInputRef.current.accept = 'image/*';

            // iOS에서만 카메라 직접 촬영 지원 추가
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (isIOS) {
                fileInputRef.current.capture = 'environment'; // 후면 카메라 우선
            }

            fileInputRef.current.click();
        }
    };

    const onFileChange = async (file?: File) => {
        if (!file) return;

        // 파일 타입 검증 강화
        const fileType = file.type.toLowerCase();
        if (!ALLOWED.includes(fileType)) {
            alert('JPG, JPEG, PNG, GIF, WEBP만 업로드 가능해요.');
            return;
        }

        // 모바일 환경 감지
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        );

        // 모바일과 데스크탑 모두에서 파일 크기 제한 적용
        const maxSize = isMobileDevice ? 3 : MAX_MB;
        if (file.size > maxSize * 1024 * 1024) {
            alert(`파일 크기는 최대 ${maxSize}MB까지 가능합니다.`);
            return;
        }

        // 디버깅을 위한 파일 정보 로깅 (모바일에서 더 상세하게)
        console.log('[Upload Info]', {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            lastModified: file.lastModified,
            isMobile: isMobileDevice,
            ...(isMobileDevice && {
                userAgent: navigator.userAgent.substring(0, 100) + '...',
            }),
        });

        try {
            setUploading(true);
            setProgress(0);

            // 업로드 시작 전 약간의 딜레이 (UI 반영, 모바일에서만)
            if (isMobileDevice) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }

            const result = await uploadProfileImage(file, (progress) => {
                setProgress(progress);
                // 진행률 로깅 (모바일에서만 상세 로그)
                if (isMobileDevice && progress % 10 === 0) {
                    console.log(`Upload progress: ${progress}%`);
                }
            });

            await updateUserProfile({ profileImage: result.fileUrl });

            const bust = `?_=${Date.now()}`;
            setLocalImageUrl(result.fileUrl + bust);
            setShowDefault(false);
            setImageError(false);

            qc.setQueryData(MY_QUERY_KEYS.USER_PROFILE, (prev: any) =>
                prev ? { ...prev, profileImage: result.fileUrl } : prev
            );
            void qc.invalidateQueries({ queryKey: MY_QUERY_KEYS.USER_PROFILE });

            // 성공 시 햅틱 피드백 (모바일에서만, 지원하는 경우)
            if (isMobileDevice && 'vibrate' in navigator) {
                navigator.vibrate(100);
            }
        } catch (err: unknown) {
            console.error('[File Upload Error]', err);

            // 데스크탑/모바일 모두에서 친화적인 에러 메시지
            let message = getErrorMessage(err);
            if (message.includes('network') || message.includes('Network')) {
                message = isMobileDevice ? 'WiFi나 데이터 연결을 확인해주세요.' : '네트워크 연결을 확인해주세요.';
            } else if (message.includes('timeout') || message.includes('시간')) {
                message = '업로드 시간이 초과됐어요. 다시 시도해주세요.';
            }

            alert(message);
        } finally {
            setUploading(false);
            setProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
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
                            <DefaultImage className="h-full w-full" />
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
                <p className="text-black-70 md:text-20px-medium min-w-0 flex-1 text-left text-sm break-all whitespace-pre-line md:break-words">
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
