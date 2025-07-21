/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import type { QuizItem } from '../../types/accordionTypes';

interface QuizContentProps {
    data: QuizItem[];

    onAnswersChange?: (_: number[]) => void;
    // onAnswersChange?: (answers: number[]) => void;
    // 원래 이거였는데 계속 ESLint 에러 떠서 주석처리함
    onClose?: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ data, onAnswersChange, onClose }) => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    // answers 상태 제거
    const [finished, setFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);

    const handleSelect = (idx: number) => {
        setSelected(idx);
    };

    const handleNext = () => {
        if (selected === null) return;
        const newAnswers = [...userAnswers, selected];
        setUserAnswers(newAnswers);
        setSelected(null);
        if (current < data.length - 1) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
            console.log(
                '사용자 답안:',
                newAnswers.map((answer) => answer + 1)
            );
        }
        onAnswersChange?.(newAnswers);
    };

    // 중단하기 버튼 클릭 시 답안 콘솔 출력
    const handleClose = () => {
        console.log(
            '사용자 답안:',
            userAnswers.map((answer) => answer + 1)
        );
        console.log('퀴즈 종료');
        if (onClose) onClose();
    };

    if (finished) {
        return <div className="py-8 text-center text-lg font-semibold">퀴즈 종료</div>;
    }

    const quiz = data[current];

    return (
        <div className="mx-auto w-full max-w-md">
            {/* 문제 */}
            <div className="text-18px-medium mb-6 text-black">
                Q{current + 1}. {quiz.question}
            </div>

            {/* 선택지 */}
            <div className="mb-8 flex flex-col gap-3">
                {quiz.options.map((opt, idx) => (
                    <button
                        key={`${opt}-${idx}`}
                        className={`text-14px-medium w-full rounded-lg border-1 px-4 py-2 transition-colors ${
                            selected === idx
                                ? 'bg-main border-main text-white'
                                : 'border-main text-main bg-white hover:bg-blue-50'
                        } `}
                        onClick={() => handleSelect(idx)}
                    >
                        <span className="mr-2">{idx + 1}.</span>
                        {opt}
                    </button>
                ))}
            </div>

            {/* 하단 버튼 */}
            <div className="flex flex-col items-center gap-2">
                <button
                    className={`text-14px-medium w-full rounded-lg px-4 py-2 text-base transition-colors ${selected !== null ? 'cursor-pointer bg-blue-200 text-blue-700' : 'cursor-not-allowed bg-blue-100 text-blue-300'} `}
                    onClick={handleNext}
                    disabled={selected === null}
                >
                    다음문제
                </button>
                <button
                    className="text-14px-medium w-full cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-gray-500"
                    onClick={handleClose}
                >
                    중단하기
                </button>
            </div>
        </div>
    );
};

export default QuizContent;
