import SnackIcon from '@/shared/assets/snack.svg?react';

interface SignupCompleteFormProps {
    onClose: () => void;
}

const SignupCompleteForm = ({ onClose }: SignupCompleteFormProps) => {
    return (
        <>
            {/* 로고 */}
            <div className="mt-[120px] flex justify-center">
                <SnackIcon />
            </div>

            {/* 환영 메시지 */}
            <div className="mt-16 text-center">
                <h2 className="text-28px-semibold text-black">스내커가 된 걸 환영해요!</h2>
                <p className="text-[18px] text-black opacity-50">이제 메인피드, 맞춤피드 모두 이용할 수 있어요.</p>
            </div>

            {/* 확인 버튼 */}
            <div className="mt-10 flex px-12">
                <button
                    onClick={onClose}
                    className="text-20px-medium bg-main h-[56px] w-full cursor-pointer rounded-md py-3 text-white"
                >
                    확인
                </button>
            </div>
        </>
    );
};

export default SignupCompleteForm;
