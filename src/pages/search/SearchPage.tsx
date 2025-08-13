import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import type { SemanticArticle } from '@/pages/search/types/searchTypes';
import LoadingFallback from '@/routes/LoadingFallback';

import { semanticSearch } from './apis/searchApi';

const SearchPage = () => {
    const [params] = useSearchParams();
    const initialQuery = params.get('query') ?? '';
    const [query, setQuery] = useState(initialQuery);
    const [threshold] = useState<number>(0.7);
    const page = 0;
    const size = 10;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [articles, setArticles] = useState<SemanticArticle[]>([]);

    const runSearch = async () => {
        const q = query.trim();
        if (!q) return;
        setLoading(true);
        setError(null);
        try {
            const res = await semanticSearch({ query: q, page, size, threshold });
            setArticles(res.articles);
        } catch {
            setError('검색 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void runSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, threshold, initialQuery]);

    useEffect(() => {
        setQuery(initialQuery); // 주소창 쿼리 바뀌면 입력값 동기화
    }, [initialQuery]);

    return (
        <div className="mx-auto mt-10 max-w-[880px]">
            <div className="border-main-30 relative rounded-[20px] border-[3px] bg-white p-12">
                {loading && <LoadingFallback />}
                {error && <div className="py-10 text-center text-red-500">{error}</div>}
                {!loading && !error && articles.length === 0 && (
                    <div className="py-10 text-center text-black/60">검색 결과가 없습니다.</div>
                )}
                {!loading &&
                    !error &&
                    articles.map((a, idx) => (
                        <div key={a.article_id}>
                            <Link
                                to={`/articles/${a.article_id}`}
                                className="focus:ring-main block rounded-xl p-3 transition hover:bg-black/5 focus:ring-2 focus:outline-none"
                                aria-label={`${a.title}로 이동`}
                            >
                                <h2 className="text-36px-semibold mb-2 text-black">{a.title}</h2>
                                <p className="text-black-70 text-20px-medium mb-6 w-[760px] leading-8">{a.summary}</p>
                            </Link>

                            {idx < articles.length - 1 && (
                                <>
                                    <hr className="mx-auto w-[780px] border border-black/30" />
                                    <div className="pb-10" />
                                </>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchPage;
