//용어집 Content
import React from 'react';

import type { GlossaryItem } from '../../types/accordionTypes';

interface GlossaryContentProps {
    data: GlossaryItem[];
}

const GlossaryContent: React.FC<GlossaryContentProps> = ({ data }) => {
    return (
        <div className="mb-4 space-y-3 rounded-2xl border-1 border-gray-300 bg-white p-6">
            {data.map((item, index) => (
                <div key={item.word} className="space-y-1">
                    <div className="text-main text-sm font-bold text-black">{item.word}</div>
                    <div className="mb-2 text-sm text-black">{item.definition}</div>
                    {index < data.length - 1 && <div className="border-b border-gray-300"></div>}
                </div>
            ))}
        </div>
    );
};

export default GlossaryContent;
