import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { reportQuiz, reportTerm } from '@/pages/article/apis/reportApi';
import Accordion from '@/pages/article/components/Accordion/Accordion';
import { useArticleTerms } from '@/pages/article/hooks/useArticleTerms';
import { useQuiz } from '@/pages/article/hooks/useQuiz';
import type { GlossaryItem } from '@/pages/article/types/accordionTypes';
import LoadingFallback from '@/routes/LoadingFallback';
import ReportConfirmModal from '@/shared/components/modal/ReportConfirmModal/ReportConfirmModal';
import ShareToast from '@/shared/components/modal/ShareModal/ShareToast';

interface GlossaryQuizProps {
    articleId: string | undefined;
}

const GlossaryQuiz = ({ articleId }: GlossaryQuizProps) => {
    const navigate = useNavigate();
    const [glossaryExpanded, setGlossaryExpanded] = useState(false);
    const [quizExpanded, setQuizExpanded] = useState(false);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);

    const [reportType, setReportType] = useState<null | 'term' | 'quiz'>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleOpenReportModal = (type: 'term' | 'quiz') => {
        setReportType(type);
    };

    const handleConfirmReport = async () => {
        if (!reportType) return;
        try {
            if (reportType === 'term') {
                await reportTerm(articleIdNumber);
                setToastMessage('용어 신고가 접수되었습니다.');
            } else {
                await reportQuiz(articleIdNumber);
                setToastMessage('퀴즈 해설 신고가 접수되었습니다.');
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.status === 409) {
                setToastMessage('이미 신고한 항목입니다.');
            } else {
                setToastMessage('신고 처리 중 오류가 발생했습니다.');
            }
        } finally {
            setReportType(null);
        }
    };

    const articleIdNumber = Number(articleId ?? 11);
    const {
        data: termsData = [],
        isLoading: termsLoading,
        isError: termsError,
        error: termsErrorData,
    } = useArticleTerms(articleIdNumber);
    const {
        data: quizData,
        isLoading: quizLoading,
        isError: quizError,
        error: quizErrorData,
    } = useQuiz(articleIdNumber);

    // 사용자 답안 업데이트 핸들러
    const handleAnswersChange = (answers: number[]) => {
        setUserAnswers(answers);
    };

    // 디버깅용 로그
    console.log('=== 퀴즈 데이터 디버깅 ===');
    console.log('articleIdNumber:', articleIdNumber);
    console.log('quizData:', quizData);
    console.log('quizData?.quizContent:', quizData?.quizContent);
    console.log('quizLoading:', quizLoading);
    console.log('quizError:', quizError);
    console.log('userAnswers:', userAnswers);
    console.log('========================');

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {termsLoading && <LoadingFallback />}
                        {termsError && (
                            <div className="text-danger text-sm">
                                용어집 조회 실패: {(termsErrorData as Error).message}
                            </div>
                        )}
                        {!termsLoading && !termsError && (
                            <Accordion
                                title="용어집"
                                data={termsData as GlossaryItem[]}
                                isExpanded={glossaryExpanded}
                                onToggle={() => setGlossaryExpanded((prev) => !prev)}
                                onReport={() => handleOpenReportModal('term')}
                            />
                        )}
                    </div>
                    <div className="space-y-4">
                        {quizLoading && <LoadingFallback />}
                        {quizError && (
                            <div className="text-danger text-sm">
                                퀴즈 조회 실패: {(quizErrorData as Error).message}
                            </div>
                        )}
                        {!quizLoading && !quizError && quizData?.quizContent && (
                            <Accordion
                                title="퀴즈"
                                data={quizData.quizContent.map((quiz) => ({
                                    id: quiz.quizId,
                                    question: quiz.question,
                                    options: quiz.options,
                                    answer: 0, // API에서 answer 정보가 없으므로 기본값 설정
                                }))}
                                isExpanded={quizExpanded}
                                onToggle={() => setQuizExpanded((prev) => !prev)}
                                onReport={() => handleOpenReportModal('quiz')}
                                onConfirm={() => {
                                    console.log('=== 퀴즈 해설 페이지 이동 시도 ===');
                                    console.log('현재 URL:', window.location.href);
                                    console.log(
                                        '이동하려는 경로:',
                                        `/articles/quiz-commentary?articleId=${articleIdNumber}`
                                    );
                                    console.log('articleIdNumber:', articleIdNumber);

                                    // navigate로 이동하면서 state 전달
                                    void navigate('/articles/quiz-commentary', {
                                        state: {
                                            articleId: articleIdNumber,
                                            userAnswers: userAnswers, // 사용자 답안 전달
                                        },
                                    });

                                    console.log('navigate 호출 완료');
                                    console.log('================================');
                                }}
                                onAnswersChange={handleAnswersChange}
                                articleId={articleIdNumber}
                            />
                        )}

                        {/* 신고 확인 모달 */}
                        {reportType && (
                            <ReportConfirmModal
                                onClose={() => setReportType(null)}
                                onConfirm={() => {
                                    void handleConfirmReport();
                                }}
                            />
                        )}

                        {toastMessage && <ShareToast message={toastMessage} onDone={() => setToastMessage(null)} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlossaryQuiz;
