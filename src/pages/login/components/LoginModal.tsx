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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="relative w-full max-w-sm rounded-xl bg-white px-6 py-8 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 닫기 버튼 */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XIcon className="h-5 w-5" />
                </button>

                {/* 로고 */}
                <div className="mb-5 text-center">
                    <h1 className="mb-2 text-2xl font-extrabold text-gray-900">스낵</h1>
                    <p className="text-black-600 text-xl font-semibold">뉴스를 간식처럼,</p>
                </div>
                <div className="mb-3 flex justify-center">
                    <SnackIcon className="h-[120px] w-[120px]" />
                </div>

                {/* 소셜 로그인 버튼 */}
                <div className="space-y-3 px-10">
                    <SocialLoginButton
                        text="Google 로그인"
                        icon={<GoogleIcon className="h-5 w-5" />}
                        bgColor="bg-white border border-gray-300"
                        textColor="text-black"
                    />

                    <SocialLoginButton text="이메일 로그인" bgColor="bg-blue-500" textColor="text-white" />
                </div>

                {/* 하단 회원가입 안내 */}
                <div className="mt-8 flex justify-center gap-7 text-sm text-gray-500">
                    <span>아직 회원이 아니신가요?</span>
                    <button className="cursor-pointer text-black hover:underline">이메일로 회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
