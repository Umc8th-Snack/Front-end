import { useState } from 'react';

import LinkIcon from '@/shared/assets/icons/link.svg?react';

import ToggleSwitch from '../button/ToggleSwitch';

interface ArticleHeaderProps {
    title: string;
    originalLink?: string;
    isNotepadEnabled?: boolean;
    onNotepadToggle?: (enabled: boolean) => void;
}

function ArticleHeader({
    title = '기사 제목',
    originalLink,
    isNotepadEnabled = false,
    onNotepadToggle,
}: ArticleHeaderProps) {
    const [internalNotepadState, setInternalNotepadState] = useState(isNotepadEnabled);

    const handleNotepadToggle = (checked: boolean) => {
        setInternalNotepadState(checked);
        onNotepadToggle?.(checked);
    };
    return (
        <div className="mb-8 w-full border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
                {/* 기사 제목 */}
                <div className="flex-1">
                    <h1 className="text-36px-semibold">{title}</h1>
                </div>

                {/* 원문 링크 */}
                {originalLink && (
                    <div className="mr-8 flex items-center gap-1 select-none">
                        <LinkIcon className="w-4" />
                        <span className="text-20px-medium text-gray-500">원문링크: </span>
                        <span className="text-20px-medium cursor-pointer text-gray-500">{originalLink}</span>
                    </div>
                )}

                {/* 메모장 토글 */}
                <div className="flex items-center gap-2">
                    <span className="text-20px-medium text-gray-500">메모장</span>
                    <ToggleSwitch checked={internalNotepadState} onChange={handleNotepadToggle} />
                </div>
            </div>
        </div>
    );
}

export default ArticleHeader;
