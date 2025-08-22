import SnackIcon from '@/shared/assets/snack.svg?react';

interface SignupCompleteFormProps {
    onClose: () => void;
}

const SignupCompleteForm = ({ onClose }: SignupCompleteFormProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center px-8 py-6 sm:px-10 sm:py-10">
            {/* 로고 */}

            <SnackIcon className="h-36 w-36 sm:h-42 sm:w-42" />

            {/* 환영 메시지 */}
            <div className="mb-5 text-center sm:mb-10">
                <h2 className="text-24px-semibold sm:text-28px-semibold mb-2 text-black sm:mb-0">
                    스내커가 된 걸 환영해요!
                </h2>
                <p className="text-16px-medium sm:text-18px text-black-50">
                    이제 메인피드, 맞춤피드 <br className="sm:hidden" />
                    모두 이용할 수 있어요.
                </p>
            </div>

            {/* 확인 버튼 */}
            <div className="w-full">
                <button
                    onClick={onClose}
                    className="text-18px-medium bg-main h-[50px] w-full cursor-pointer rounded-md py-2 text-white hover:opacity-70 sm:py-2"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default SignupCompleteForm;
