import { Link } from 'react-router-dom';

import DefaultImage from '@/pages/my/assets/default-image.svg?react';

const Profile = () => {
    return (
        <div className="mb-8 flex flex-col items-start text-center">
            <div className="mt-4 h-[104px] w-[104px] rounded-full">
                <DefaultImage />
            </div>
            <div className="text-36px-semibold mt-4 text-black">닉네임</div>
            <div className="text-24px-medium text-black-70">아이디</div>
            <div className="flex items-center justify-between gap-92">
                <p className="text-20px-medium text-black-30 mt-6">소개글을 작성해보세요!</p>
                <Link to="/mypage/edit-profile">
                    <button className="bg-main text-18px-medium mt-4 rounded-[8px] px-4 py-2 text-white hover:bg-blue-700">
                        프로필 편집
                    </button>
                </Link>
            </div>
            <div className="bg-black-30 mt-2 h-[1px] w-full" />
        </div>
    );
};

export default Profile;
