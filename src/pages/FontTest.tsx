export const FontTest = () => {
    return (
        <div className="flex gap-12 p-4 font-sans">
            {/* 폰트 스타일 미리보기 */}
            <section className="w-1/2">
                <h2 className="text-24px-semibold mb-4">폰트 스타일 미리보기</h2>
                <div className="space-y-2">
                    <div className="text-20px-bold text-black">20px Bold / color: black</div>

                    <div className="text-36px-semibold text-main">36px SemiBold / color: main</div>
                    <div className="text-28px-semibold text-main-70">28px SemiBold / color: main-70</div>
                    <div className="text-24px-semibold text-main-50">24px SemiBold / color: main-50</div>
                    <div className="text-24px-semibold text-main-30">24px SemiBold / color: main-30</div>

                    <div className="text-36px-medium text-black">36px Medium / color: black</div>
                    <div className="text-28px-medium text-black">28px Medium / color: black</div>
                    <div className="text-24px-medium text-black-70">24px Medium / color: black-70</div>
                    <div className="text-20px-medium text-black-50">20px Medium / color: black-50</div>
                    <div className="text-18px-medium text-black-30">18px Medium / color: black-30</div>

                    <div className="text-14px-medium text-danger">14px Medium / color: danger</div>
                </div>
            </section>

            {/* 실제 적용 예시 */}
            <section className="w-1/2">
                <h2 className="text-24px-semibold mb-4">실제 적용 예시</h2>

                <div className="mb-6 flex flex-col items-center justify-center gap-4">
                    <div className="bg-kakao-yellow text-20px-medium text-kakao-brown flex h-[56px] w-[320px] items-center justify-center rounded-[8px]">
                        카카오 로그인
                    </div>
                    <div className="bg-naver-green text-20px-medium flex h-[56px] w-[320px] items-center justify-center rounded-[8px] text-white">
                        네이버 로그인
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-36px-semibold">스낵</div>
                    <div className="text-28px-medium">뉴스를 간식처럼,</div>
                    <div className="text-18px-medium text-black-30">아직 회원이 아니신가요?</div>
                    <div className="text-18px-medium text-black-30">닉네임은 8자 이내로 설정해 주세요.</div>

                    <div className="flex items-center whitespace-nowrap">
                        <div className="text-24px-medium text-main">SNACK</div>
                        <div className="text-24px-medium">에서 사용할 닉네임을 입력하세요.</div>
                    </div>

                    <div className="text-20px-medium text-main-70">찾고싶은 기사가 있나요?</div>
                    <div className="text-14px-medium text-danger">비밀번호가 일치하지 않습니다.</div>

                    <div className="flex items-center whitespace-nowrap">
                        <div className="text-20px-bold">스내커</div>
                        <div className="text-20px-medium">님</div>
                    </div>

                    <div className="border-main-30 h-[160px] w-[312px] items-center rounded-[16px] border-[3px] p-4">
                        <div className="text-24px-semibold">퀴즈</div>
                        <div className="text-14px-medium text-black-50">
                            기사를 다 읽으셨군요! 퀴즈를 풀러 가볼까요?
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FontTest;
