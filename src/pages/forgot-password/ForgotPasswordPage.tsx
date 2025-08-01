import { useState } from 'react';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const isFormValid = email.trim() !== '';

    return (
        <div className="mt-21 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">비밀번호 찾기</h2>
            <p className="text-24px-medium text-black-70">입력하신 이메일 주소로 비밀번호를 재설정 할 수 있어요.</p>
            <form className="mt-[152px] w-[432px]">
                {/* 이메일 입력 */}
                <div>
                    <label htmlFor="email" className="text-24px-medium">
                        이메일
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="border-black-30 placeholder-black-30 text-24px-medium h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* 버튼 */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`text-24px-medium mt-[48px] h-[68px] w-full rounded-[8px] py-2 text-white transition-colors ${
                        isFormValid ? 'hover:bg-main cursor-pointer bg-blue-500' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    전송
                </button>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
