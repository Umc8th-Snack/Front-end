import { SCROLL_CONFIG } from '../../constants/quiz';
import { useQuizScroll } from '../../hooks/useQuizScroll';
import { QuizHeader } from './QuizHeader';
import { QuizQuestionItem } from './QuizQuestionItem';
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
    const { scrollRef, showResultMessage } = useQuizScroll(() => {
        // 스크롤 시 실행할 로직 (필요시 추가)
    });

    const totalQuestions = questions.length;
    const correctAnswers = questions.filter((q) => q.isCorrect).length;

    return (
        <div className="border-main-30 w-full rounded-lg border-[3px] bg-white p-8 shadow-sm">
            <QuizHeader />

            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div ref={scrollRef} className={`${SCROLL_CONFIG.MAX_HEIGHT} overflow-y-auto p-2`}>
                {/* 문제별 해설 */}
                {questions.map((question) => (
                    <QuizQuestionItem key={question.id} question={question} />
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
