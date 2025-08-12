import { useState } from 'react';

import ArticleCard from '@/shared/components/card/ArticleCard';
import FieldChips from '@/shared/components/chip/FieldChips';
import MemoPad from '@/shared/components/modal/MemoPad/MemoPad';
import ArticleHeader from '@/shared/components/quiz/ArticleHeader';
import QuizCommentary from '@/shared/components/quiz/QuizCommentary';
import { quizCommentaryDummyData } from '@/shared/components/quiz/quizCommentaryData';
import QuizTestButtons from '@/shared/components/quiz/QuizTestButtons';

const QuizCommentaryPage = () => {
    // ===== 테스트 모드 (현재 활성화) =====
    const [testMode, setTestMode] = useState<'allCorrect' | 'partialCorrect' | 'allWrong'>('partialCorrect');

    // ===== 메모장 상태 관리 =====
    const [isMemoPadOpen, setIsMemoPadOpen] = useState(false);

    // 메모장 토글 핸들러
    const handleMemoPadToggle = (enabled: boolean) => {
        setIsMemoPadOpen(enabled);
    };

    // 테스트용 데이터 생성
    const getTestData = () => {
        const baseQuestions = quizCommentaryDummyData.questions;

        switch (testMode) {
            case 'allCorrect':
                return {
                    questions: baseQuestions.map((q) => ({ ...q, isCorrect: true })),
                };
            case 'allWrong':
                return {
                    questions: baseQuestions.map((q) => ({ ...q, isCorrect: false })),
                };
            case 'partialCorrect':
            default:
                return {
                    questions: baseQuestions,
                };
        }
    };

    const testData = getTestData();

    // ===== 원래 더미데이터 사용 (테스트 완료 후 삭제 시 참고) =====
    /*
    // 테스트 관련 import 제거
    // import QuizTestButtons from '@/shared/components/quiz/QuizTestButtons';
    // import { useState } from 'react';

    // 테스트 상태 제거
    // const [testMode, setTestMode] = useState<'allCorrect' | 'partialCorrect' | 'allWrong'>('partialCorrect');

    // 테스트 데이터 생성 함수 제거
    // const getTestData = () => { ... };
    // const testData = getTestData();

    // 원래 더미데이터 직접 사용
    const questions = quizCommentaryDummyData.questions;
    */

    return (
        <>
            {/* 테스트 버튼 (현재 활성화) */}
            <QuizTestButtons testMode={testMode} onTestModeChange={setTestMode} />

            {/* 테스트 버튼 제거 시 사용할 코드 (주석처리) */}
            {/* <QuizTestButtons /> 제거 */}

            <div className="mx-auto flex w-full max-w-[1200px] items-start gap-30 px-4 py-8 lg:px-0">
                <div className="flex w-[70%] flex-col items-start justify-center">
                    <FieldChips label="사회" />
                    <div className="mt-10 w-full">
                        <ArticleHeader
                            title="기사 제목"
                            originalLink="https://www.snack.com"
                            isNotepadEnabled={isMemoPadOpen}
                            onNotepadToggle={handleMemoPadToggle}
                        />

                        {/* 현재 테스트 데이터 사용 */}
                        <QuizCommentary questions={testData.questions} />

                        {/* 원래 더미데이터 사용 시 (주석처리) */}
                        {/* <QuizCommentary 
                            questions={questions}
                        /> */}
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

            {/* 메모장 오버레이 */}
            {isMemoPadOpen && (
                <div className="fixed top-0 right-0 z-50 px-18 py-8">
                    <div className="mt-20">
                        <MemoPad articleId="test-article-123" />
                    </div>
                </div>
            )}
        </>
    );
};

export default QuizCommentaryPage;
