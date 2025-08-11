import ArticleCard from '@/shared/components/card/ArticleCard';
import FieldChips from '@/shared/components/chip/FieldChips';
import ArticleHeader from '@/shared/components/quiz/ArticleHeader';
import QuizCommentary from '@/shared/components/quiz/QuizCommentary';
import { quizCommentaryDummyData } from '@/shared/components/quiz/quizCommentaryData';

const QuizCommentaryPage = () => {
    // 더미데이터 직접 사용
    const questions = quizCommentaryDummyData.questions;

    return (
        <>
            <div className="mx-auto flex w-full max-w-[1200px] items-start gap-30 px-4 py-8 lg:px-0">
                <div className="flex w-[70%] flex-col items-start justify-center">
                    <FieldChips label="사회" />
                    <div className="mt-10 w-full">
                        <ArticleHeader
                            title="기사 제목"
                            originalLink="https://www.snack.com"
                            isNotepadEnabled={true}
                            onNotepadToggle={() => {}}
                        />

                        <QuizCommentary questions={questions} />
                    </div>
                </div>

                {/* 관련 기사 보러가기 임의로 넣어둠 */}
                <div className="flex w-[30%] justify-end">
                    <div className="mt-30 flex h-[800px] w-[240px] flex-col items-center gap-3 rounded-2xl bg-gray-200">
                        <ArticleCard />
                        <ArticleCard />
                        <ArticleCard />
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuizCommentaryPage;
