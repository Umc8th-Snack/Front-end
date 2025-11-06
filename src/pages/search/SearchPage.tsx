// SearchPage.tsx
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import type { SemanticArticle } from '@/pages/search/types/searchTypes';
import LoadingFallback from '@/routes/LoadingFallback';

import { isSemanticSearchApiError, semanticSearch } from './apis/searchApi';

const MIN_LENGTH_MESSAGE = '검색어는 두 글자 이상이어야 합니다.';
const EMPTY_RESULT_MESSAGE = '검색할 내용이 없습니다.';

const SearchPage = () => {
    const [params] = useSearchParams();
    const q = (params.get('query') ?? '').trim();

    const threshold = 0.7;
    const page = 0;
    const size = 10;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showLengthPopup, setShowLengthPopup] = useState(false);
    const [articles, setArticles] = useState<SemanticArticle[]>([]);

    useEffect(() => {
        const run = async () => {
            if (!q) {
                setLoading(false);
                setError(null);
                setShowLengthPopup(false);
                setArticles([]);
                return;
            }

            if (q.length < 2) {
                setLoading(false);
                setShowLengthPopup(true);
                setError(null);
                setArticles([]);
                return;
            }

            setLoading(true);
            setShowLengthPopup(false);
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
                setShowLengthPopup(false);
                if (isSemanticSearchApiError(e) && e.code === 'FEED_9606') {
                    setError(EMPTY_RESULT_MESSAGE);
                    setArticles(e.payload?.articles ?? []);
                } else if (e instanceof Error) {
                    setError(e.message || '검색 중 오류가 발생했습니다.');
                    setArticles([]);
                } else {
                    setError('검색 중 오류가 발생했습니다.');
                    setArticles([]);
                }
            } finally {
                setLoading(false);
            }
        };

        void run();
    }, [q, page, threshold]);

    const errorClassName = useMemo(() => {
        if (!error) return '';
        return error === EMPTY_RESULT_MESSAGE ? 'text-black' : 'text-red-500';
    }, [error]);

    const resultsContainerSpacing = showLengthPopup ? 'mt-14' : 'mt-0';

    return (
        <div className="mx-auto mt-10 max-w-[880px] px-4">
            <div className="relative">
                {showLengthPopup && (
                    <div className="absolute top-0 left-1/2 z-10 w-max -translate-x-1/2 translate-y-full rounded-xl bg-black px-4 py-2 text-center text-white shadow-lg">
                        {MIN_LENGTH_MESSAGE}
                    </div>
                )}

                <div
                    className={`border-main-30 relative rounded-[20px] border-[3px] bg-white p-4 sm:p-6 lg:p-12 ${resultsContainerSpacing}`}
                >
                    {loading && <LoadingFallback />}
                    {error && <div className={`py-10 text-center ${errorClassName}`}>{error}</div>}
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
        </div>
    );
};

export default SearchPage;
