import React, { useState } from 'react';

const InitialPage = () => {
    const [nickname, setNickname] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '연예', '스포츠'];

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-white">
            {/* 배경 블러 효과 박스 */}
            <div className="absolute top-1/2 left-1/2 h-[560px] w-[1440px] -translate-x-1/2 -translate-y-1/2 border-t-[3px] border-b-[3px] border-[#0557E0] shadow-[30px_30px_30px_rgba(0,0,0,0.1)] blur-[15px]" />

            {/* 메인 컨텐츠 */}
            <div className="relative flex h-full items-center justify-center">
                <div className="relative flex h-[560px] w-[1440px] items-center justify-center">
                    {/* 왼쪽 영역: 이미지 + 인사말 */}
                    <div className="absolute left-0 flex flex-col items-start">
                        {/* 이미지 영역 */}
                        <div className="h-[300px] w-[300px]">
                            <img
                                src="/handGiftBox.png"
                                alt="Hand holding giftbox"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* 인사말 */}
                        <div className="mt-8">
                            <h1 className="font-['Pretendard'] text-[28px] leading-[42px] font-semibold text-[#0557E0]">
                                안녕하세요!
                            </h1>
                            <p className="mt-2 font-['Pretendard'] text-[36px] leading-[54px] font-semibold text-black">
                                몇 가지 질문으로
                                <br />
                                스내커 님을 알아가고 싶어요.
                            </p>
                        </div>
                    </div>

                    {/* 세로선 */}
                    <div className="absolute top-1/2 left-[41.53%] h-[400px] w-px -translate-y-1/2 bg-black" />

                    {/* 오른쪽 폼 영역 */}
                    <div className="absolute left-[47.64%] flex flex-col gap-8">
                        {/* 닉네임 입력 섹션 */}
                        <div>
                            <p className="font-['Pretendard'] text-[24px] leading-[36px] font-medium">
                                <span className="text-[#0557E0]">SNACK</span>
                                <span className="text-black">에서 사용할 닉네임을 입력해주세요.</span>
                            </p>
                            <div className="relative mt-4">
                                <input
                                    type="text"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    placeholder="닉네임은 8자 이내로 설정해주세요."
                                    maxLength={8}
                                    className="h-[56px] w-[400px] rounded-lg border border-black/30 px-4 font-['Pretendard'] text-[18px] placeholder:text-black/30 focus:border-[#0557E0] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* 관심 카테고리 섹션 */}
                        <div className="mt-8">
                            <p className="font-['Pretendard'] text-[24px] leading-[36px] font-medium">
                                <span className="text-[#0557E0]">관심 카테고리</span>
                                <span className="text-black">를 선택해주세요.</span>
                            </p>
                            <p className="mt-2 font-['Pretendard'] text-[18px] leading-[27px] font-medium text-black/50">
                                선택한 관심 카테고리로 맞춤 피드를 생성해드려요.
                            </p>

                            {/* 카테고리 버튼 그리드 */}
                            <div className="mt-6 w-[472px]">
                                {/* 첫 번째 줄: 3개 */}
                                <div className="mb-6 flex gap-6">
                                    {categories.slice(0, 3).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => toggleCategory(category)}
                                            className={`h-[40px] w-[100px] rounded-[20.73px] border-[0.41px] border-black font-['Pretendard'] text-[18px] font-medium transition-colors ${
                                                selectedCategories.includes(category)
                                                    ? 'border-[#0557E0] bg-[#0557E0] text-white'
                                                    : 'bg-white text-black hover:bg-gray-50'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                                {/* 두 번째 줄: 4개 */}
                                <div className="flex gap-6">
                                    {categories.slice(3).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => toggleCategory(category)}
                                            className={`h-[40px] w-[100px] rounded-[20.73px] border-[0.41px] border-black font-['Pretendard'] text-[18px] font-medium transition-colors ${
                                                selectedCategories.includes(category)
                                                    ? 'border-[#0557E0] bg-[#0557E0] text-white'
                                                    : 'bg-white text-black hover:bg-gray-50'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InitialPage;
