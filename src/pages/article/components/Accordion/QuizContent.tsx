import { useState } from 'react';

import type { QuizItem } from '@/pages/article/types/quizTypes';
import QuizCompleteModal from '@/shared/components/modal/QuizCompleteModal/QuizCompleteModal';
import QuizExitModal from '@/shared/components/modal/QuizExitModal/QuizExitModal';

interface QuizContentProps {
    data: QuizItem[];
    onAnswersChange?: (_: number[]) => void;
    onClose?: () => void;
    onConfirm?: () => void;
}

const QuizContent = ({ data: quizData, onAnswersChange, onClose, onConfirm }: QuizContentProps) => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    const handleSelect = (idx: number) => {
        setSelected(idx);
    };

    const handleNext = () => {
        if (selected === null) return;
        const newAnswers = [...userAnswers, selected];
        setUserAnswers(newAnswers);
        setSelected(null);
        if (current < quizData.length - 1) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
            setShowCompleteModal(true);
            console.log(
                '사용자 답안:',
                newAnswers.map((answer) => answer + 1)
            );
        }
        onAnswersChange?.(newAnswers);
    };

    // 중단하기 버튼 클릭 시 모달 표시
    const handleClose = () => {
        setShowExitModal(true);
    };

    // 모달에서 이어풀기 선택 시
    const handleContinue = () => {
        setShowExitModal(false);
    };

    // 모달에서 중단하기 선택 시
    const handleExit = () => {
        console.log(
            '사용자 답안:',
            userAnswers.map((answer) => answer + 1)
        );
        console.log('퀴즈 종료');
        setShowExitModal(false);
        if (onClose) onClose();
    };

    // 퀴즈 완료 모달에서 닫기 선택 시
    const handleCompleteClose = () => {
        setShowCompleteModal(false);
        if (onClose) onClose();
    };

    // 퀴즈 완료 모달에서 정답 확인 선택 시
    const handleCompleteConfirm = () => {
        console.log('정답 확인 페이지로 이동');
        setShowCompleteModal(false);
        // 사용자 답안과 함께 정답 확인 페이지로 이동
        onConfirm?.(); // 부모에게 라우팅 위임
    };

    // 퀴즈 데이터가 없을 때
    if (!quizData || quizData.length === 0) {
        return <div className="py-8 text-center text-lg font-semibold">퀴즈가 없습니다</div>;
    }

    if (finished) {
        return (
            <>
                <div className="py-8 text-center text-lg font-semibold">퀴즈 종료</div>

                {/* 퀴즈 완료 모달 */}
                {showCompleteModal && (
                    <QuizCompleteModal onClose={handleCompleteClose} onConfirm={handleCompleteConfirm} />
                )}
            </>
        );
    }

    const quiz = quizData[current];

    return (
        <>
            <div className="mx-auto w-full max-w-md">
                {/* 문제 */}
                <div className="text-18px-medium mb-6 text-black">
                    Q{current + 1}. {quiz.question}
                </div>

                {/* 선택지 */}
                <div className="mb-8 flex flex-col gap-3">
                    {Array.isArray(quiz.options) &&
                        quiz.options.map((opt: string, idx: number) => {
                            const optionKey = `quiz-${quiz.id}-option-${String(opt).replace(/[^a-zA-Z0-9]/g, '')}-${idx}`;
                            return (
                                <button
                                    key={optionKey}
                                    className={`text-14px-medium w-full rounded-lg border-1 px-4 py-2 transition-colors ${
                                        selected === idx
                                            ? 'bg-main border-main text-white'
                                            : 'border-main text-main hover:bg-main bg-white hover:text-white'
                                    } `}
                                    onClick={() => handleSelect(idx)}
                                >
                                    <span className="mr-2">{idx + 1}.</span>
                                    {opt}
                                </button>
                            );
                        })}
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
                    <button className="w-full cursor-pointer rounded-lg px-4 text-gray-500" onClick={handleClose}>
                        <span className="text-14px-medium border-b border-gray-500">중단하기</span>
                    </button>
                </div>
            </div>

            {/* 퀴즈 중단 모달 */}
            {showExitModal && (
                <QuizExitModal
                    onClose={() => setShowExitModal(false)}
                    onContinue={handleContinue}
                    onExit={handleExit}
                />
            )}
        </>
    );
};

export default QuizContent;
