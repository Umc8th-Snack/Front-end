export interface GlossaryItem {
    word: string;
    definitions: string[];
    createdAt: string;
}

export interface AccordionProps {
    title: string;
    data: GlossaryItem[];
    isExpanded?: boolean;
    onToggle?: () => void;
}

export interface QuizItem {
    question: string;
    options: string[];
    answer: number; // 정답 인덱스
}
