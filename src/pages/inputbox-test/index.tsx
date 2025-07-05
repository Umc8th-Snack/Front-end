import InputBox from '@/shared/components/InputBox/InputBox';

const InputBoxTestPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            <div>
                <InputBox label="이메일" placeholder="이메일을 입력해주세요" type="email" />
                <InputBox label="비밀번호" placeholder="비밀번호를 입력해주세요" type="password" />
                <InputBox label="닉네임" placeholder="닉네임을 입력해주세요" required />
            </div>
        </div>
    );
};

export default InputBoxTestPage;
