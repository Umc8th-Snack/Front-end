import { useEffect, useRef, useState } from 'react';

import BookmarkIcon from '@/shared/assets/Bookmark.svg?react';
import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';
import ShareIcon from '@/shared/assets/Share.svg?react';

import QuizResultMessage from './QuizResultMessage';

interface Question {
    id: number;
    question: string;
    answer: string;
    isCorrect: boolean;
    explanation: string;
}

interface QuizCommentaryProps {
    questions: Question[];
}

function QuizCommentary({ questions }: QuizCommentaryProps) {
    const [showResultMessage, setShowResultMessage] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px 여유

                if (isAtBottom && !showResultMessage) {
                    setShowResultMessage(true);
                }
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }

        return undefined;
    }, [showResultMessage]);

    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q) => q.isCorrect).length;

    return (
        <div className="border-main-30 w-full rounded-lg border-[3px] bg-white p-8 shadow-sm">
            {/* 헤더 */}
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-2">
                    <RectangleIcon />
                    <h1 className="text-28px-semibold">해설</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <BookmarkIcon className="h-[24px] w-[24px]" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <ShareIcon className="h-[24px] w-[24px]" />
                    </button>
                </div>
            </div>
            <div className="mb-4 border-t border-gray-300"></div>

            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div ref={scrollRef} className="max-h-140 overflow-y-auto p-2">
                {/* 문제별 해설 */}
                {questions.map((question) => (
                    <div key={question.id} className="mb-10 border-b border-gray-300 pb-6 last:mb-0">
                        <div className="mb-6 flex items-start gap-4">
                            <h3 className="text-28px-semibold flex-1">
                                Q{question.id}. {question.question}
                            </h3>
                            <span
                                className={`text-20px-medium whitespace-nowrap ${question.isCorrect ? 'text-red-500' : 'text-red-500'}`}
                            >
                                {question.isCorrect ? '맞았습니다!' : '틀렸습니다!'}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="text-24px-semibold text-main">답: {question.answer}</p>
                        </div>

                        <div className="text-20px-medium" style={{ color: 'var(--color-black-30)' }}>
                            <h4 className="mb-1">해설</h4>
                            <p className="leading-relaxed">{question.explanation}</p>
                        </div>
                    </div>
                ))}

                {/* 결과 메시지 (스크롤 시 나타남) */}
                <QuizResultMessage
                    totalQuestions={totalQuestions}
                    correctAnswers={correctAnswers}
                    isVisible={showResultMessage}
                />
            </div>
        </div>
    );
}

export default QuizCommentary;
