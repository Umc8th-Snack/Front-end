import { useEffect, useState } from 'react';

import { fetchMemoList } from '@/pages/my/apis/memo';
import { fetchScrapList } from '@/pages/my/apis/scrap';
import type { Memo, Scrap } from '@/pages/my/types/types';

import MemoCard from './components/MemoCard';
import Pagination from './components/Pagination';
import Profile from './components/Profile';
import ScrapCard from './components/ScrapCard';
import TabMenu from './components/TabMenu';

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

const MyPage = () => {
    const [tab, setTab] = useState<'memo' | 'scrap'>('memo');

    // 메모 상태
    const [memos, setMemos] = useState<Memo[]>([]);
    const [memoPage, setMemoPage] = useState(1);
    const [totalMemoPages, setTotalMemoPages] = useState(1);

    // 스크랩 상태
    const [scraps, setScraps] = useState<Scrap[]>([]);
    const [scrapPage, setScrapPage] = useState(1);
    const [totalScrapPages, setTotalScrapPages] = useState(1);

    const pageSize = 5;

    useEffect(() => {
        if (tab === 'memo') {
            void fetchMemoList(memoPage, pageSize).then((data) => {
                setMemos(data.memos);
                setTotalMemoPages(data.totalPages);
            });
        } else if (tab === 'scrap') {
            void fetchScrapList(scrapPage, pageSize).then((data) => {
                setScraps(data.scraps);
                setTotalScrapPages(data.totalPages);
            });
        }
    }, [tab, memoPage, scrapPage]);

    const currentPage = tab === 'memo' ? memoPage : scrapPage;
    const changePage = (page: number) => {
        if (tab === 'memo') setMemoPage(page);
        else setScrapPage(page);
    };

    return (
        <div className="relative mx-auto w-[700px] px-4 py-8">
            <Profile />
            <TabMenu tab={tab} onChange={setTab} />
            <div className="mt-6 space-y-6">
                {tab === 'memo'
                    ? memos.map((m) => <MemoCard key={m.memoId} date={formatDate(m.createdAt)} content={m.content} />)
                    : scraps.map((s) => (
                          <ScrapCard
                              key={s.scrapId}
                              title={s.title}
                              summary={s.summaryPreview}
                              articleId={s.articleId}
                          />
                      ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={tab === 'memo' ? totalMemoPages : totalScrapPages}
                onPageChange={changePage}
            />
        </div>
    );
};

export default MyPage;
