import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Accordion from '@/pages/article/components/Accordion/Accordion';
import { quizData } from '@/pages/article/components/Accordion/testData';
import { useArticleTerms } from '@/pages/article/hooks/useArticleTerms';
import type { GlossaryItem } from '@/pages/article/types/accordionTypes';
import LoadingFallback from '@/routes/LoadingFallback';

const AccordionTestPage = () => {
    const [glossaryExpanded, setGlossaryExpanded] = useState(false);
    const [quizExpanded, setQuizExpanded] = useState(false);

    const { articleId: articleIdParam } = useParams<{ articleId: string }>();
    const articleId = Number(articleIdParam ?? 11);
    const { data = [], isLoading, isError, error } = useArticleTerms(articleId);

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {isLoading && <LoadingFallback />}
                        {isError && (
                            <div className="text-danger text-sm">용어집 조회 실패: {(error as Error).message}</div>
                        )}
                        {!isLoading && !isError && (
                            <Accordion
                                title="용어집"
                                data={data as GlossaryItem[]}
                                isExpanded={glossaryExpanded}
                                onToggle={() => setGlossaryExpanded((prev) => !prev)}
                            />
                        )}
                    </div>
                    <div className="space-y-4">
                        <Accordion
                            title="퀴즈"
                            data={quizData}
                            isExpanded={quizExpanded}
                            onToggle={() => setQuizExpanded((prev) => !prev)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionTestPage;
