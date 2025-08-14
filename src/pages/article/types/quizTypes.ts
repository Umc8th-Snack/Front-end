// 퀴즈 API 응답 타입 정의

// 개별 퀴즈 내용
export interface QuizContent {
    quizId: number;
    question: string;
    options: string[];
}

// 퀴즈 결과 데이터
export interface QuizResult {
    quizContent: QuizContent[];
}

// 퀴즈 API 응답 전체 구조
export interface QuizApiResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    result: QuizResult;
    error: Record<string, unknown>;
}

// 컴포넌트에서 사용할 퀴즈 아이템 (기존 QuizItem과 호환)
export interface QuizItem {
    id: number;
    question: string;
    options: string[];
    answer: number;
}

// 채점 API 요청 타입
export interface QuizSubmissionRequest {
    submittedAnswers: Array<{
        quizId: number;
        submitted_answer_index: number;
    }>;
}

// 채점 API 응답 타입
export interface QuizGradingDetail {
    quizId: number;
    submitted_answer: number;
    answer_index: number;
    description: string;
    correct: boolean;
    isCorrect: boolean;
}

export interface QuizGradingResult {
    correctCount: number;
    details: QuizGradingDetail[];
}

// 채점 API 응답 전체 구조
export interface QuizGradingApiResponse {
    isSuccess: boolean;
    code: string;
    message: string;
    correctCount: number;
    result: QuizGradingResult;
    error: Record<string, unknown>;
}
