import GoogleIcon from '../../../../public/GoogleIcon.svg';
import KaKaoIcon from '../../../../public/KaKaoIcon.svg';
import NaverIcon from '../../../../public/NaverIcon.svg';
import XIcon from '../../../../public/XIcon.svg';
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
                    <img src={XIcon} alt="닫기" className="h-5 w-5" />
                </button>

                {/* 로고 */}
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-2xl font-extrabold text-gray-900">스낵</h1>
                    <p className="text-black-600 text-xl font-semibold">뉴스를 간식처럼,</p>
                </div>

                {/* 소셜 로그인 버튼 */}
                <div className="space-y-3 px-10">
                    <SocialLoginButton
                        text="카카오 로그인"
                        icon={<img src={KaKaoIcon} alt="카카오" className="h-5 w-5" />}
                        bgColor="bg-yellow-300"
                        textColor="text-black"
                    />

                    <SocialLoginButton
                        text="네이버 로그인"
                        icon={<img src={NaverIcon} alt="네이버" className="h-5 w-5" />}
                        bgColor="bg-green-500"
                        textColor="text-white"
                    />

                    <SocialLoginButton
                        text="Google 로그인"
                        icon={<img src={GoogleIcon} alt="구글" className="h-5 w-5" />}
                        bgColor="bg-white border border-gray-300"
                        textColor="text-black"
                    />

                    <SocialLoginButton text="이메일 로그인" bgColor="bg-blue-500" textColor="text-white" />
                </div>

                {/* 하단 회원가입 안내 */}
                <div className="mt-8 flex justify-center gap-7 text-sm text-gray-500">
                    <span>아직 회원이 아니신가요?</span>
                    <button onClick={() => console.log('회원가입')} className="hover:underline">
                        이메일로 회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
