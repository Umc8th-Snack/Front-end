import React, { useState } from 'react';

import Accordion from '@/shared/components/Accordion/Accordion';
import { glossaryTestData, quizData } from '@/shared/components/Accordion/testData';

const AccordionTestPage: React.FC = () => {
    const [glossaryExpanded, setGlossaryExpanded] = useState(false);
    const [quizExpanded, setQuizExpanded] = useState(false);

    return (
        <div className="min-h-screen p-8">
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionTestPage;
