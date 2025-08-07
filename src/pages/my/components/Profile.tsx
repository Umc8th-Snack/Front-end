import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchUserProfile } from '@/pages/my/apis/user';
import DefaultImage from '@/pages/my/assets/default-image.svg?react';
import type { UserProfile } from '@/pages/my/types/types';

const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setProfile(data);
            } catch (error) {
                console.error('프로필 조회 실패', error);
            }
        };
        void loadProfile();
    }, []);

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
