//통합 아코디언 컴포넌트
import React from 'react';

import ChevronIcon from '@/assets/chevronIcon.svg?react';
import SnackIcon from '@/assets/snackIcon.svg?react';

import type { AccordionProps } from '../../types/accordionTypes';
import GlossaryContent from './GlossaryContent';

const Accordion: React.FC<AccordionProps> = ({ title, data, isExpanded = false, onToggle }) => {
    return (
        <div className="max-w-md rounded-lg border border-blue-200 bg-white p-6">
            {/* 헤더 */}
            <div className="mb-4 flex flex-col items-start space-x-3">
                <div className="mb-2 flex items-center space-x-2">
                    <SnackIcon />
                    <h3 className="text-lg font-bold text-black">{title}</h3>
                </div>
                <p className="mt-1 text-sm text-black">이 기사의 핵심 어휘들을 살펴보아요.</p>
            </div>

            {/* 구분선 */}
            <div className="mb-4 border-t border-gray-300"></div>

            {/* 컨텐츠(용어집) */}
            {isExpanded && <GlossaryContent data={data} />}

            {/* 토글 버튼 */}
            <div className="flex w-full justify-center">
                <button
                    onClick={onToggle}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-100 px-8 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                >
                    <span className="text-sm">{isExpanded ? '접어두기' : '펼쳐보기'}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronIcon width={14} />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Accordion;
