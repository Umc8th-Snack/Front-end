import TitleWithToggle from '@/pages/article/components/TitleWithToggle/TitleWithToggle';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import ToggleSwitch from '@/shared/components/button/ToggleSwitch';
import FieldChips from '@/shared/components/chip/FieldChips';

interface ArticleHeaderProps {
    title: string;
    category: string;
    originalLink?: string;
    isNotepadEnabled: boolean;
    onNotepadToggle: (enabled: boolean) => void;
}

function ArticleHeader({ title, category, originalLink, isNotepadEnabled, onNotepadToggle }: ArticleHeaderProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* 상단 바: 좌(칩+원문링크) / 우(토글) */}
            <div className="grid grid-cols-[1fr_auto] items-center gap-4">
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

                {/* ✅ 토글: 같은 선상의 가장 우측 */}
                <div className="flex items-center justify-end gap-2">
                    <span className="text-20px-medium text-black-70 leading-none">메모장</span>
                    <ToggleSwitch checked={isNotepadEnabled} onChange={onNotepadToggle} />
                </div>
            </div>

            {/* 제목 */}
            <TitleWithToggle title={title} />
        </div>
    );
}

export default ArticleHeader;
