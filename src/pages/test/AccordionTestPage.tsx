import React, { useState } from 'react';

import { Accordion, glossaryTestData } from '../../shared/components/Accordion';

const AccordionTestPage: React.FC = () => {
    const [glossaryExpanded, setGlossaryExpanded] = useState(false);

    return (
        <div className="min-h-screen p-8">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-1 gap-8">
                    {/* 용어집 테스트 */}
                    <div className="space-y-4">
                        <Accordion
                            title="용어집"
                            data={glossaryTestData}
                            isExpanded={glossaryExpanded}
                            onToggle={() => setGlossaryExpanded(!glossaryExpanded)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionTestPage;
