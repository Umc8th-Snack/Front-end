/**
 * 아코디언 컴포넌트에서 사용하는 타입 정의
 * 용어집과 퀴즈 데이터를 포함
 */

export interface GlossaryItem {
    word: string;
    definition: string;
}

export interface AccordionProps {
    title: string;
    data: GlossaryItem[];
    isExpanded?: boolean;
    onToggle?: () => void;
    onConfirm?: () => void;
    onAnswersChange?: (answers: number[]) => void;
    articleId?: number;
}

export interface QuizItem {
    id: number;
    question: string;
    options: string[];
    answer: number; // 정답 인덱스
}
