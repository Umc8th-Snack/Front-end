import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchUserProfile } from '@/pages/my/apis/user';
import DefaultImage from '@/pages/my/assets/default-image.svg?react';
import { QUERY_KEYS } from '@/pages/my/constants/queryConstants';

const Profile = () => {
    const {
        data: profile,
        isLoading,
        isError,
    } = useQuery({
        queryKey: QUERY_KEYS.USER_PROFILE,
        queryFn: fetchUserProfile,
    });

    if (isLoading) return <div className="mb-8">프로필 불러오는 중...</div>;
    if (isError) return <div className="mb-8 text-red-500">프로필 조회 실패</div>;

    return (
        <div className="mb-8 flex flex-col items-start text-center">
            <div className="mt-4 h-[104px] w-[104px] overflow-hidden rounded-full">
                {profile?.profileUrl ? (
                    <img src={profile.profileUrl} alt="프로필 이미지" className="h-full w-full object-cover" />
                ) : (
                    <DefaultImage />
                )}
            </div>
            <div className="text-36px-semibold mt-4 text-black">{profile?.nickname}</div>
            <div className="text-24px-medium text-black-70">{profile?.email}</div>
            <div className="flex items-center justify-between gap-92">
                <p className="text-20px-medium text-black-30 mt-6">
                    {profile?.introduction || '소개글을 작성해보세요!'}
                </p>
                <Link to="/mypage/edit-profile">
                    <button className="bg-main text-18px-medium mt-4 cursor-pointer rounded-[8px] px-4 py-2 text-white hover:bg-blue-700">
                        프로필 편집
                    </button>
                </Link>
            </div>
            <div className="bg-black-30 mt-2 h-[1px] w-full" />
        </div>
    );
};

export default Profile;
