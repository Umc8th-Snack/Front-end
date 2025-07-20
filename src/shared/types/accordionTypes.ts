export interface GlossaryItem {
    word: string;
    definition: string;
}

export interface AccordionProps {
    title: string;
    data: GlossaryItem[];
    isExpanded?: boolean;
    onToggle?: () => void;
}
