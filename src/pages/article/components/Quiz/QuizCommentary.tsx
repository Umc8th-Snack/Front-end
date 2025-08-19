import QuizHeader from '@/pages/article/components/Quiz/QuizHeader';
import QuizQuestionItem from '@/pages/article/components/Quiz/QuizQuestionItem';
import QuizResultMessage from '@/pages/article/components/Quiz/QuizResultMessage';
import { useQuizScroll } from '@/pages/article/hooks/useQuizScroll';

interface Question {
    id: number;
    question: string;
    answer: string;
    isCorrect: boolean;
    explanation: string;
}

interface QuizCommentaryProps {
    questions: Question[];
    totalQuestions: number;
    correctAnswers: number;
}

function QuizCommentary({ questions, totalQuestions, correctAnswers }: QuizCommentaryProps) {
    const { scrollRef, showResultMessage } = useQuizScroll(() => {
        // 스크롤 시 실행할 로직 (필요시 추가)
    });

    return (
        <div className="border-main-30 w-full rounded-[30px] border-[3px] bg-white p-8 shadow-sm">
            <QuizHeader />

            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div ref={scrollRef} className="p-2 lg:max-h-140 lg:overflow-y-auto">
                {/* 문제별 해설 */}
                {questions.map((question) => (
                    <QuizQuestionItem key={question.id} question={question} />
                ))}

                {/* 결과 메시지 (lg 미만에서는 즉시 표시, lg 이상에서는 스크롤 시 표시) */}
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
