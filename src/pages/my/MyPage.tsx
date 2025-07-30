import { useState } from 'react';
import { Link } from 'react-router-dom';

import ArrowUpright from '@/shared/assets/icons/arrow-up-right.svg?react';

const MyPage = () => {
    const [tab, setTab] = useState<'memo' | 'scrap'>('memo');

    return (
        <div className="relative mx-auto w-[700px] px-4 py-8">
            {/* 프로필 영역 */}
            <div className="mb-8 flex flex-col items-start text-center">
                {/* 프로필 이미지 */}
                <div className="bg-black-30 mt-4 h-[104px] w-[104px] rounded-full" />

                {/* 닉네임 + 아이디 */}
                <div className="text-36px-semibold mt-4 text-black">닉네임</div>
                <div className="text-24px-medium text-black-70">아이디</div>

                <div className="flex items-center justify-between gap-92">
                    {/* 소개글 */}
                    <p className="text-20px-medium text-black-30 mt-6">소개글을 작성해보세요!</p>

                    {/* 프로필 편집 버튼 */}
                    <Link to="/mypage/edit-profile">
                        <button className="bg-main text-18px-medium mt-4 rounded-[8px] px-4 py-2 text-white hover:bg-blue-700">
                            프로필 편집
                        </button>
                    </Link>
                </div>
                <div className="bg-black-30 mt-2 h-[1px] w-full" />
            </div>

            {/* 탭 메뉴 */}
            <div className="mb-4 flex">
                <button
                    className={`text-24px-semibold flex-1 cursor-pointer border-b-2 py-1 text-center transition-colors duration-200 ${
                        tab === 'memo' ? 'border-main text-main' : 'border-black-30 text-black-30'
                    }`}
                    onClick={() => setTab('memo')}
                >
                    메모장
                </button>
                <button
                    className={`text-24px-semibold flex-1 cursor-pointer border-b-2 py-1 text-center transition-colors duration-200 ${
                        tab === 'scrap' ? 'border-main text-main' : 'border-black-30 text-black-30'
                    }`}
                    onClick={() => setTab('scrap')}
                >
                    스크랩
                </button>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="mt-6">
                {tab === 'memo' ? (
                    <div className="space-y-6">
                        <MemoCard date="2025.07.29" content="가장 최신 메모 내용" />
                        <MemoCard date="2025.07.28" content="두번째로 최신 메모 내용" />
                    </div>
                ) : (
                    <div className="space-y-6">
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
        <div className="border-main-70 h-[172px] w-[672px] rounded-[8px] border p-4">
            <div className="flex items-center justify-between">
                <span className="text-24px-medium">{date}</span>
                <button className="top-3 right-3 cursor-pointer">
                    <ArrowUpright />
                </button>
            </div>
            <p className="text-20px-medium text-black-70 mt-2">{content}</p>
        </div>
    );
};

const ScrapCard = ({ title, excerpt }: { title: string; excerpt: string }) => {
    return (
        <div className="border-main-70 h-[172px] w-[672px] rounded-[8px] border p-4">
            <div className="text-24px-medium text-black">{title}</div>
            <p className="text-20px-medium text-black-70 mt-2">{excerpt}</p>
        </div>
    );
};

export default MyPage;
