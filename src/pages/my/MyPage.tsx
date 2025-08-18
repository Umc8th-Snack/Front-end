import { useEffect, useState } from 'react';

import EmptyState from './components/EmptyState';
import MemoCard from './components/MemoCard';
import Pagination from './components/Pagination';
import Profile from './components/Profile';
import ScrapCard from './components/ScrapCard';
import SkeletonCard from './components/SkeletonCard';
import TabMenu from './components/TabMenu';
import { useKoreanDateFormatter } from './hooks/useKoreanDateFormatter';
import { useMemos } from './hooks/useMemos';
import { useScraps } from './hooks/useScraps';

const PAGE_SIZE = 5;

const MyPage = () => {
    const [tab, setTab] = useState<'memo' | 'scrap'>('memo');
    const [memoPage, setMemoPage] = useState(1);
    const [scrapPage, setScrapPage] = useState(1);

    const fmt = useKoreanDateFormatter();

    // 탭 전환 시 해당 페이지 1로 리셋
    useEffect(() => {
        if (tab === 'memo') setMemoPage(1);
        else setScrapPage(1);
    }, [tab]);

    // Query (활성화된 탭만 enabled)
    const {
        data: memosData,
        isLoading: memosLoading,
        isError: memosError,
        error: memosErrObj,
    } = useMemos(memoPage, PAGE_SIZE, tab === 'memo');

    const {
        data: scrapsData,
        isLoading: scrapsLoading,
        isError: scrapsError,
        error: scrapsErrObj,
    } = useScraps(scrapPage, PAGE_SIZE, tab === 'scrap');

    const isLoading = tab === 'memo' ? memosLoading : scrapsLoading;
    const isError = tab === 'memo' ? memosError : scrapsError;
    const errorMsg =
        (tab === 'memo' ? (memosErrObj as any)?.message : (scrapsErrObj as any)?.message) ??
        '목록을 불러오지 못했어요.';

    const currentPage = tab === 'memo' ? memoPage : scrapPage;
    const totalPages = tab === 'memo' ? (memosData?.totalPages ?? 1) : (scrapsData?.totalPages ?? 1);

    const changePage = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (tab === 'memo') setMemoPage(page);
        else setScrapPage(page);
    };

    return (
        <div className="relative mx-auto w-full max-w-screen-sm px-4 py-6 md:max-w-2xl md:py-8">
            <Profile />

            {/* 상단 고정 탭 */}
            <div className="sticky top-0 z-10 -mx-4 bg-white/95 px-4 pt-3 pb-2 backdrop-blur md:static md:bg-transparent md:px-0 md:pt-0 md:pb-0">
                <TabMenu tab={tab} onChange={setTab} />
            </div>

            {/* 로딩 */}
            {isLoading && (
                <div className="mt-4 space-y-3 md:mt-6">
                    {[...Array(3)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            )}

            {/* 에러 */}
            {!isLoading && isError && (
                <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                </div>
            )}

            {/* 본문 */}
            {!isLoading && !isError && (
                <>
                    <div className="mt-4 space-y-4 md:mt-6 md:space-y-6">
                        {tab === 'memo' ? (
                            memosData && memosData.memos.length > 0 ? (
                                memosData.memos.map((m) => (
                                    <MemoCard
                                        key={m.memoId}
                                        date={fmt.format(new Date(m.createdAt))}
                                        content={m.content}
                                        articleId={m.articleId}
                                    />
                                ))
                            ) : (
                                <EmptyState title="메모가 없어요" desc="기사에서 메모를 작성해보세요." />
                            )
                        ) : scrapsData && scrapsData.scraps.length > 0 ? (
                            scrapsData.scraps.map((s) => (
                                <ScrapCard
                                    key={s.scrapId}
                                    title={s.title}
                                    summary={s.summaryPreview}
                                    articleId={s.articleId}
                                />
                            ))
                        ) : (
                            <EmptyState title="스크랩이 없어요" desc="관심 있는 기사를 스크랩해보세요." />
                        )}
                    </div>

                    {/* 하단 고정 페이지네이션 (모바일) */}
                    <div className="md:backdrop-blur-0 sticky right-0 bottom-0 left-0 -mx-4 bg-white/95 px-4 pt-3 pb-3 backdrop-blur md:static md:-mx-0 md:bg-transparent md:pt-0">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MyPage;
