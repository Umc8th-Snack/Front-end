import GoogleIcon from '@/assets/GoogleIcon.svg?react';
import SnackIcon from '@/assets/snack.svg?react';
import XIcon from '@/assets/XIcon.svg?react';

import SocialLoginButton from './SocialLoginButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="bg-black-50 fixed inset-0 flex items-center justify-center" onClick={onClose}>
            <div
                className="absolute h-[640px] w-[440px] rounded-[15px] bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    <XIcon />
                </button>

                <div className="mt-12 text-center">
                    <p className="text-36px-semibold text-black">스낵</p>
                    <p className="text-28px-medium mt-1 text-black">뉴스를 간식처럼,</p>
                </div>

                {/* 로고 */}
                <div className="mt-18 flex justify-center">
                    <SnackIcon />
                </div>

                {/* 소셜 로그인 버튼 */}
                <div className="mt-18 flex flex-col items-center gap-4">
                    <SocialLoginButton
                        text="Google 로그인"
                        icon={<GoogleIcon />}
                        bgColor="bg-white"
                        textColor="text-black"
                        width="320px"
                        height="56px"
                    />

                    <SocialLoginButton
                        text="이메일 로그인"
                        bgColor="bg-main"
                        textColor="text-white"
                        width="320px"
                        height="56px"
                    />
                </div>

                {/* 하단 회원가입 안내 */}
                <div className="text-black-30 text-18px-medium mt-15 flex items-center justify-center gap-4">
                    <span>아직 회원이 아니신가요?</span>
                    <button className="cursor-pointer text-black hover:underline">이메일로 회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
