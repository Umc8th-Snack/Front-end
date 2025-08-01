import { useState } from 'react';

const PasswordChangePage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isFormValid =
        email.trim() !== '' &&
        newPassword.trim() !== '' &&
        confirmPassword.trim() !== '' &&
        newPassword === confirmPassword;

    return (
        <div className="mt-20 flex min-h-screen flex-col items-center">
            <h2 className="text-36px-semibold">비밀번호 변경</h2>
            <p className="text-24px-medium text-black-70">변경하실 새로운 비밀번호를 설정해주세요.</p>
            <form className="mt-12 w-[432px] space-y-6">
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

                {/* 비밀번호 입력 */}
                <div>
                    <label htmlFor="password" className="text-24px-medium">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="border-black-30 text-24px-medium placeholder-black-30 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none"
                        placeholder="새 비밀번호를 입력해주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {/* 비밀번호 확인 */}
                <div>
                    <label htmlFor="confirm" className="text-24px-medium">
                        비밀번호 재확인
                    </label>
                    <input
                        id="confirm"
                        type="password"
                        className="border-black-30 text-24px-medium placeholder-black-30 h-[68px] w-full rounded-[8px] border px-3 py-2 outline-none"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* 버튼 */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`text-24px-medium mt-6 h-[68px] w-full rounded-[8px] py-2 text-white transition-colors ${
                        isFormValid ? 'hover:bg-main cursor-pointer bg-blue-500' : 'bg-black-30 cursor-not-allowed'
                    }`}
                >
                    비밀번호 변경
                </button>
            </form>
        </div>
    );
};

export default PasswordChangePage;
