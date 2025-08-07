import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArticleDetail } from '@/pages/article/apis/articleApi';
import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import type { ArticleDetail } from '@/pages/article/types/article';
import AccordionTestPage from '@/pages/test/AccordionTestPage';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import ToggleSwitch from '@/shared/components/button/ToggleSwitch';
import FieldChips from '@/shared/components/chip/FieldChips';
import { DummyShareModal } from '@/shared/components/modal/ShareModal/ShareModal';

const ArticlePage = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<ArticleDetail | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!articleId) return;
            try {
                //  실제 API 호출
                const data = await getArticleDetail(Number(articleId));
                setArticle(data);
            } catch (e) {
                console.error('기사 상세 로딩 실패:', e);
            }
        };
        void fetchData();
    }, [articleId]);

    const handleToggleChange = (_checked: boolean) => {
        handleToggle(_checked);
    };

    if (!article) {
        return <div>로딩 중...</div>; // 로딩 화면
    }

    return (
        <div className="w-[714px] pl-6">
            <div className="mx-auto flex max-w-[714px] min-w-2xl flex-col gap-4 px-6 py-6">
                {/* 첫 번째 줄: FieldChips + 원문 링크 */}
                <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                    <FieldChips label={article.category} />
                    <div className="flex items-center gap-1">
                        <ChainIcon />
                        {article && (
                            <a
                                href={article.articleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-20px-medium text-black-70 inline-block max-w-[450px] truncate align-bottom"
                                title={article.articleUrl}
                            >
                                원문링크: {article.articleUrl}
                            </a>
                        )}
                    </div>
                </div>

                {/* 두 번째 줄: 기사 제목 + 메모장 토글 */}
                {article && (
                    <div className="grid w-full grid-cols-[1fr_auto] items-end gap-4">
                        {/* 제목 */}
                        <h1 className="text-36px-semibold leading-tight break-words">{article.title}</h1>

                        {/* 메모장 토글 */}
                        <div className="flex items-center gap-2">
                            <div className="text-20px-medium text-black-70">메모장</div>
                            <ToggleSwitch onChange={handleToggleChange} checked={false} />
                        </div>
                    </div>
                )}

                <hr className="border-black-30 w-full border-t" />

                {article && (
                    <div className="flex justify-center pt-4">
                        <SummarizedNewsContainer summary={article.summary} />
                    </div>
                )}
                <div className="flex justify-center pt-4">
                    <AccordionTestPage />
                </div>
            </div>
            <DummyShareModal />
        </div>
    );
};

export default ArticlePage;

function handleToggle(_checked: boolean) {
    throw new Error('Function not implemented.');
}
