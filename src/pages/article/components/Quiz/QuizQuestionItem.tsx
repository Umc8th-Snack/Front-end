import { QUIZ_MESSAGES } from '@/pages/article/constants/quiz';

/* 개별 퀴즈 문제와 해설을 렌더링 */

interface Question {
    id: number;
    question: string;
    answer: string;
    isCorrect: boolean;
    explanation: string;
}

interface QuizQuestionItemProps {
    question: Question;
}

const QuizQuestionItem = ({ question }: QuizQuestionItemProps) => {
    return (
        <div className="border-black-30 mb-10 border-b pb-6 last:mb-0">
            <div className="mb-6 flex items-start gap-4">
                <h3 className="text-28px-semibold flex-1">
                    Q{question.id}. {question.question}
                </h3>
                <span
                    className={`text-20px-medium whitespace-nowrap ${
                        question.isCorrect ? 'text-red-500' : 'text-red-500'
                    }`}
                >
                    {question.isCorrect ? QUIZ_MESSAGES.CORRECT : QUIZ_MESSAGES.INCORRECT}
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
    );
};

export default QuizQuestionItem;
