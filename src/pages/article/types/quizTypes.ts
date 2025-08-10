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
    error: Record<string, any>;
}

// 컴포넌트에서 사용할 퀴즈 아이템 (기존 QuizItem과 호환)
export interface QuizItem {
    id: number;
    question: string;
    options: string[];
    answer: number;
}
