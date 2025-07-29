import { useState } from 'react';

const MyPage = () => {
    const [tab, setTab] = useState<'memo' | 'scrap'>('memo');

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            {/* 프로필 영역 */}
            <section className="mb-8 flex flex-col items-center text-center">
                {/* 프로필 이미지 */}
                <div className="mb-4 h-24 w-24 rounded-full bg-gray-300" />

                {/* 닉네임 + 아이디 */}
                <div className="text-xl font-semibold">닉네임</div>
                <div className="text-gray-500">아이디</div>

                {/* 소개글 */}
                <p className="mt-2 text-sm text-gray-500">소개글을 작성해보세요!</p>

                {/* 프로필 편집 버튼 */}
                <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                    프로필 편집
                </button>
            </section>

            {/* 탭 메뉴 */}
            <div className="mb-4 flex border-b">
                <button
                    className={`flex-1 border-b-2 py-2 text-center font-semibold transition-colors duration-200 ${
                        tab === 'memo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setTab('memo')}
                >
                    메모장
                </button>
                <button
                    className={`flex-1 border-b-2 py-2 text-center font-semibold transition-colors duration-200 ${
                        tab === 'scrap' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                    }`}
                    onClick={() => setTab('scrap')}
                >
                    스크랩
                </button>
            </div>

            {/* 탭 콘텐츠 */}
            <div>
                {tab === 'memo' ? (
                    <div className="space-y-4">
                        <MemoCard date="2025.07.29" content="가장 최신 메모 내용" />
                        <MemoCard date="2025.07.28" content="두번째로 최신 메모 내용" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <ScrapCard title="기사 제목" excerpt="댓글을 단 기사 중 가장 최신 기사의 본문 일부..." />
                        <ScrapCard title="기사 제목" excerpt="댓글을 단 기사 중 가장 최신 기사의 본문 일부..." />
                    </div>
                )}
            </div>
        </div>
    );
};

const MemoCard = ({ date, content }: { date: string; content: string }) => {
    return (
        <div className="rounded-lg border p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <span className="font-semibold">{date}</span>
                <span className="text-sm text-blue-500">↗</span>
            </div>
            <p className="mt-2 text-sm text-gray-800">{content}</p>
        </div>
    );
};

const ScrapCard = ({ title, excerpt }: { title: string; excerpt: string }) => {
    return (
        <div className="rounded-lg border border-blue-300 p-4">
            <div className="font-semibold text-gray-900">{title}</div>
            <p className="mt-1 text-sm text-gray-600">{excerpt}</p>
        </div>
    );
};

export default MyPage;
