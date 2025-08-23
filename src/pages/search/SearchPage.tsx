// SearchPage.tsx
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import type { SemanticArticle } from '@/pages/search/types/searchTypes';
import LoadingFallback from '@/routes/LoadingFallback';

import { semanticSearch } from './apis/searchApi';

const SearchPage = () => {
    const [params] = useSearchParams();
    const q = (params.get('query') ?? '').trim();

    const threshold = 0.7;
    const page = 0;
    const size = 10;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [articles, setArticles] = useState<SemanticArticle[]>([]);

    useEffect(() => {
        const run = async () => {
            if (!q) {
                setArticles([]);
                return;
            }
            setLoading(true);
            setError(null);
            console.log('[SearchPage] runSearch:start', { q, page, size, threshold });

            try {
                const result = await semanticSearch({ query: q, page, size, threshold });

                console.log('[SearchPage] runSearch:done', {
                    q_from_url: q,
                    q_in_result: result.query,
                    articles_len: result.articles.length,
                    totalCount: result.totalCount,
                });

                setArticles(result.articles);
            } catch (e) {
                console.log('[SearchPage] runSearch:error', e);
                setError('검색 중 오류가 발생했습니다.');
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        void run();
    }, [q, page, threshold]);

    return (
        <div className="mx-auto mt-10 max-w-[880px] px-4">
            <div className="border-main-30 relative rounded-[20px] border-[3px] bg-white p-4 sm:p-6 lg:p-12">
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
                                className="focus:ring-main block rounded-xl p-3 transition focus:ring-2 focus:outline-none"
                                aria-label={`${a.title}로 이동`}
                            >
                                <div className="inline-block min-w-[200px] rounded-xl px-3 pt-2 hover:bg-black/5">
                                    <h2 className="text-20px-semibold sm:text-24px-semibold md:text-28px-semibold lg:text-36px-semibold mb-1.5 text-black sm:mb-2">
                                        {a.title}
                                    </h2>
                                    <p className="text-black-70 text-14px-medium sm:text-16px-medium md:text-18px-medium lg:text-20px-medium mb-4 w-full leading-6 break-words sm:mb-5 sm:leading-7 md:leading-8 lg:mb-6 lg:max-w-[760px]">
                                        {a.summary}
                                    </p>
                                </div>
                            </Link>

                            {idx < articles.length - 1 && (
                                <>
                                    <hr
                                        className="mx-0 w-full border border-black/30 lg:mx-auto lg:max-w-[780px]"
                                        aria-hidden="true"
                                    />
                                    <div className="pb-5" />
                                </>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchPage;
