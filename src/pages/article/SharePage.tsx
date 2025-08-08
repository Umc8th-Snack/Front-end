import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSharedArticle } from '@/pages/article/hooks/useSharedArticle';

const SharePage = () => {
    const { uuid = '' } = useParams<{ uuid: string }>();
    const { data, isLoading, isError, error } = useSharedArticle(uuid);

    const published = useMemo(() => {
        if (!data?.publishedAt) return '';
        return new Date(data.publishedAt).toLocaleString();
    }, [data?.publishedAt]);

    if (!uuid) {
        return <div className="mx-auto max-w-3xl p-6 text-sm text-red-600">유효하지 않은 공유 링크입니다.</div>;
    }

    if (isLoading) {
        return <div className="mx-auto max-w-3xl p-6 text-sm text-gray-500">공유 기사를 불러오는 중…</div>;
    }

    if (isError) {
        return <div className="mx-auto max-w-3xl p-6 text-sm text-red-600">조회 실패: {(error as Error)?.message}</div>;
    }

    if (!data) {
        return <div className="mx-auto max-w-3xl p-6 text-sm text-gray-500">데이터를 찾을 수 없습니다.</div>;
    }

    const appArticlePath = `/articles/${data.articleId}`;

    return (
        <div className="mx-auto max-w-3xl p-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-2 text-xs text-gray-500">{published}</div>
                <h1 className="mb-3 text-xl font-bold text-black">{data.title}</h1>
                <div className="mb-4 text-xs text-gray-600">카테고리: {data.category}</div>
                <p className="mb-6 text-sm leading-relaxed whitespace-pre-wrap text-black">{data.summary}</p>

                <div className="flex flex-wrap gap-3">
                    <a
                        href={data.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-50"
                    >
                        원문 보기
                    </a>

                    <Link
                        to={appArticlePath}
                        className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
                    >
                        앱에서 보기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SharePage;
