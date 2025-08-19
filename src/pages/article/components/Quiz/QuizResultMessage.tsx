/*퀴즈 결과를 표시하는 메시지 컴포넌트*/

interface QuizResultMessageProps {
    totalQuestions: number;
    correctAnswers: number;
    isVisible: boolean;
}

const QuizResultMessage = ({ totalQuestions, correctAnswers, isVisible }: QuizResultMessageProps) => {
    if (!isVisible) return null;

    const correctRate = (correctAnswers / totalQuestions) * 100;

    // 결과에 따른 메시지 설정
    const getMessage = () => {
        if (correctRate === 100) {
            return {
                title: `완벽해요! ${totalQuestions}문제 모두 맞히셨어요.`,
                subtitle: '오늘의 시사왕으로 임명합니다!',
            };
        } else if (correctRate === 0) {
            return {
                title: `이번에는 정답과 조금 멀었어요.`,
                subtitle: '괜찮아요, 다음번엔 분명 더 나아질 거예요.',
            };
        } else {
            return {
                title: `좋아요! ${correctAnswers}문제 맞히셨어요.`,
                subtitle: '틀린 부분은 가볍게 복습해 보아요.',
            };
        }
    };

    const message = getMessage();

    return (
        <div className="border-main-50 mt-8 rounded-lg border-2 bg-white px-2 py-4 text-center">
            <p className="text-18px-semibold md:text-24px-semibold mb-2">{message.title}</p>
            <p className="text-14px-medium md:text-18px-medium lg:text-20px-medium text-black-50">{message.subtitle}</p>
        </div>
    );
};

export default QuizResultMessage;
