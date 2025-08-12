import { Link, useParams } from 'react-router-dom';

import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import { useSharedArticle } from '@/pages/article/hooks/useSharedArticle';
import LoadingFallback from '@/routes/LoadingFallback';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import FieldChips from '@/shared/components/chip/FieldChips';

const SharePage = () => {
    const { uuid } = useParams<{ uuid: string }>();
    const { data, isLoading, isError, error } = useSharedArticle(uuid ?? '');

    if (!uuid) {
        return <div className="text-danger mx-auto max-w-[714px] p-6 text-sm">유효하지 않은 공유 링크입니다.</div>;
    }

    if (isLoading) return <LoadingFallback />;
    if (isError || !data) {
        return (
            <div className="text-danger mx-auto max-w-[714px] p-6 text-sm">
                공유 기사 조회 실패: {(error as Error)?.message ?? '데이터가 없습니다.'}
            </div>
        );
    }

    const appArticlePath = `/articles/${data.articleId}`;
    const published = data.publishedAt ? new Date(data.publishedAt).toLocaleString() : '';

    return (
        <div className="">
            <div className="mx-auto flex max-w-[714px] min-w-2xl flex-col gap-4 px-6 py-6">
                {/* FieldChips + 원문 링크 */}
                <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                    <FieldChips label={data.category} />
                    <div className="flex items-center gap-1">
                        <ChainIcon />
                        {data && (
                            <a
                                href={data.originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-20px-medium text-black-70 decoration-black-70 inline-block max-w-[525px] truncate align-bottom underline decoration-[0.5px] underline-offset-5"
                                title={data.title}
                            >
                                원문링크
                            </a>
                        )}
                    </div>
                </div>

                {/* 제목 */}
                <div className="grid w-full grid-cols-[1fr_auto] items-end gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-36px-semibold leading-tight break-words">{data.title}</h1>
                        {published && <span className="text-black-50 text-18px-medium mt-1">{published}</span>}
                    </div>
                </div>

                <hr className="border-black-30 w-full border-t" />

                {/* 요약 */}
                <div className="flex justify-center pt-4">
                    <SummarizedNewsContainer
                        summary={data.summary}
                        articleId={data.articleId}
                        title={data.title}
                        image={''}
                    />
                </div>

                {/* 앱에서 보기 버튼 */}
                <div className="flex justify-end">
                    <Link
                        to={appArticlePath}
                        className="bg-main rounded-xl px-4 py-2 text-sm text-white hover:opacity-90"
                    >
                        스낵에서 보기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SharePage;
