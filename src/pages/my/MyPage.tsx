import { useState } from 'react';

import MemoCard from './components/MemoCard';
import Pagination from './components/Pagination';
import Profile from './components/Profile';
import ScrapCard from './components/ScrapCard';
import TabMenu from './components/TabMenu';
import dummyMemos from './data/DummyMemos';
import dummyScraps from './data/DummyScraps';
import type { Memo, Scrap } from './types/types';

//마이페이지
const MyPage = () => {
    const [tab, setTab] = useState<'memo' | 'scrap'>('memo');
    const [memoPage, setMemoPage] = useState(1);
    const [scrapPage, setScrapPage] = useState(1);
    const pageSize = 5;

    const currentPage = tab === 'memo' ? memoPage : scrapPage;
    const data = tab === 'memo' ? dummyMemos : dummyScraps;
    const totalPages = Math.ceil(data.length / pageSize);
    const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                    ? (paginatedData as Memo[]).map((m) => <MemoCard key={m.id} date={m.date} content={m.content} />)
                    : (paginatedData as Scrap[]).map((s) => (
                          <ScrapCard key={s.id} title={s.title} summary={s.summary} />
                      ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
        </div>
    );
};

export default MyPage;
