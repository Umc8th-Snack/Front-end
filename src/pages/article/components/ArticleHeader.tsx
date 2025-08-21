import TitleWithToggle from '@/pages/article/components/TitleWithToggle/TitleWithToggle';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import FieldChips from '@/shared/components/chip/FieldChips';

interface ArticleHeaderProps {
    title: string;
    category: string;
    originalLink?: string;
    isNotepadEnabled?: boolean;
    onNotepadToggle?: (enabled: boolean) => void;
}

function ArticleHeader({
    title,
    category,
    originalLink,
    isNotepadEnabled = false,
    onNotepadToggle,
}: ArticleHeaderProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* FieldChips + 원문 링크 */}
            <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                <FieldChips label={category} />
                {originalLink && (
                    <div className="flex items-center gap-1">
                        <ChainIcon />
                        <a
                            href={originalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-18px-medium md:text-20px-medium text-black-70 decoration-black-70 inline-block max-w-[525px] truncate align-bottom underline decoration-[0.5px] underline-offset-5"
                            title={originalLink}
                        >
                            원문링크
                        </a>
                    </div>
                )}
            </div>

            {/* 제목 + 메모장 토글 (TitleWithToggle 사용) */}
            <TitleWithToggle title={title} onToggleChange={onNotepadToggle || (() => {})} checked={isNotepadEnabled} />
        </div>
    );
}

export default ArticleHeader;
