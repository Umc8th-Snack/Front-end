//통합 아코디언 컴포넌트
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ChevronIcon from '@/assets/chevronIcon.svg?react';
import SnackIcon from '@/assets/snackIcon.svg?react';

import type { GlossaryItem } from '../../types/accordionTypes';
import GlossaryContent from './GlossaryContent';
import QuizContent from './QuizContent';

// 통합 아코디언 컴포넌트 - 용어집과 퀴즈 모두 지원
const Accordion = ({
    title,
    data,
    isExpanded = false,
    onToggle,
    articleId,
}: {
    title: string;
    data: unknown[]; // any 대신 unknown[] 사용
    isExpanded?: boolean;
    onToggle?: () => void;
    articleId?: number;
}) => {
    const navigate = useNavigate();
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const isQuiz =
        data.length > 0 &&
        Array.isArray(data) &&
        data.length > 0 &&
        typeof data[0] === 'object' &&
        data[0] !== null &&
        'question' in data[0];
    return (
        <div className="border-main-30 max-w-md rounded-[16px] border-[3px] bg-white p-6">
            {/* 헤더 */}
            <div className="mb-4 flex flex-col items-start space-x-3">
                <div className="mb-2 flex items-center space-x-2">
                    <SnackIcon />
                    <h3 className="text-24px-semibold">{title}</h3>
                </div>
                <p className="text-14px-medium text-black-50 mt-1">
                    {isQuiz ? '기사를 다 읽으셨군요! 퀴즈를 풀러 가볼까요?' : '이 기사의 핵심 어휘들을 살펴보아요.'}
                </p>
            </div>

            {/* 구분선 */}
            <div className="mb-4 border-t border-gray-300"></div>

            {/* 컨텐츠(용어집/퀴즈) */}
            {isExpanded &&
                (isQuiz ? (
                    <QuizContent
                        articleId={articleId || 1}
                        onClose={onToggle}
                        onAnswersChange={setUserAnswers}
                        onConfirm={() => {
                            // 사용자 답안을 state로 전달
                            void navigate('/article/quiz-commentary', {
                                state: {
                                    userAnswers,
                                    articleId: articleId || 1,
                                },
                            });
                        }}
                    />
                ) : (
                    <GlossaryContent data={data as GlossaryItem[]} />
                ))}

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
