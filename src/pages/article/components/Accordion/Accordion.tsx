//통합 아코디언 컴포넌트
import ChevronIcon from '@/assets/chevronIcon.svg?react';
import SnackIcon from '@/assets/snackIcon.svg?react';
import type { AccordionProps, GlossaryItem, QuizItem } from '@/pages/article/types/accordionTypes';
import ReportIcon from '@/shared/assets/article/siren.svg?react';

import GlossaryContent from './GlossaryContent';
import QuizContent from './QuizContent';

const Accordion = ({
    title,
    data,
    isExpanded = false,
    onToggle,
    onConfirm,
    onAnswersChange,
    onReport,
    error,
    isLoading,
}: AccordionProps) => {
    // title을 기준으로 퀴즈인지 판단 (더 안전함)
    const isQuiz = title === '퀴즈';
    return (
        <div className="border-main-30 max-w-md rounded-[16px] border-[3px] bg-white p-6">
            {/* 헤더 */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <SnackIcon />
                        <h3 className="text-24px-semibold">{title}</h3>
                    </div>
                    {onReport && (
                        <button type="button" onClick={onReport} className="rounded-[8px] p-1 hover:bg-black/5">
                            <ReportIcon className="text-black-70 h-[24px] w-[24px] cursor-pointer" />
                        </button>
                    )}
                </div>
                <p className="text-14px-medium text-black-50 mt-1">
                    {isQuiz ? '기사를 다 읽으셨군요! 퀴즈를 풀러 가볼까요?' : '이 기사의 핵심 어휘들을 살펴보아요.'}
                </p>
            </div>

            {/* 구분선 */}
            <div className="border-black-30 mb-4 border-t"></div>

            {/* 컨텐츠(용어집/퀴즈) */}
            {isExpanded && (
                <>
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-gray-500">로딩 중...</div>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="mb-2 text-sm text-red-500">⚠️</div>
                            <div className="text-sm text-red-500">{error}</div>
                        </div>
                    ) : // 기존 컨텐츠 렌더링
                    isQuiz ? (
                        <QuizContent
                            data={data as QuizItem[]}
                            onClose={onToggle}
                            onConfirm={onConfirm}
                            onAnswersChange={onAnswersChange}
                        />
                    ) : (
                        <GlossaryContent data={data as GlossaryItem[]} />
                    )}
                </>
            )}

            {/* 토글 버튼 */}
            <div className="flex w-full justify-center">
                {(!isQuiz || !isExpanded) && (
                    <button
                        onClick={onToggle}
                        className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gray-100 px-8 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                    >
                        <span className="text-14px-medium">{isExpanded ? '접어두기' : '펼쳐보기'}</span>
                        <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronIcon width={20} />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Accordion;
