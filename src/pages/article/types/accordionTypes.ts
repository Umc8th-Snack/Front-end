/**
 * 아코디언 컴포넌트에서 사용하는 타입 정의
 * 용어집과 퀴즈 데이터를 포함
 */

export interface GlossaryItem {
    word: string;
    definitions: string[]; // definition → definitions로 수정
    createdAt: string; // createdAt 필드 추가
}

export interface AccordionProps {
    title: string;
    data: GlossaryItem[] | QuizItem[];
    isExpanded?: boolean;
    onToggle?: () => void;
    onConfirm?: () => void;
    onAnswersChange?: (answers: number[]) => void;
    articleId?: number;
    onReport?: () => void;
    // 에러 상태 추가
    error?: string | null;
    isLoading?: boolean;
}

export interface QuizItem {
    id: number;
    question: string;
    options: string[];
    answer: number; // 정답 인덱스
}
