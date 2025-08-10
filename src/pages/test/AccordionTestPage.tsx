import { useState } from 'react';

import Accordion from '@/pages/article/components/Accordion/Accordion';
import { glossaryTestData, quizData } from '@/pages/article/components/Accordion/testData';

interface AccordionTestPageProps {
    articleId: number;
}

const AccordionTestPage = ({ articleId }: AccordionTestPageProps) => {
    const [glossaryExpanded, setGlossaryExpanded] = useState(false);
    const [quizExpanded, setQuizExpanded] = useState(false);

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Accordion
                            title="용어집"
                            data={glossaryTestData}
                            isExpanded={glossaryExpanded}
                            onToggle={() => setGlossaryExpanded((prev) => !prev)}
                        />
                    </div>
                    <div className="space-y-4">
                        <Accordion
                            title="퀴즈"
                            data={quizData}
                            isExpanded={quizExpanded}
                            onToggle={() => setQuizExpanded((prev) => !prev)}
                            articleId={articleId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionTestPage;
