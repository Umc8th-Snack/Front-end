import { useState } from 'react';
import { useParams } from 'react-router-dom';

import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import AccordionTestPage from '@/pages/test/AccordionTestPage';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import ToggleSwitch from '@/shared/components/button/ToggleSwitch';
import CategoryChips from '@/shared/components/chip/CategoryChips';
import MemoPad from '@/shared/components/modal/MemoPad/MemoPad';

const ArticlePage = () => {
    const { id } = useParams<{ id: string }>();
    const articleId = id || '1'; // string 타입으로 통일, 기본값 "1"

    // 메모장 상태 관리
    const [isMemoPadOpen, setIsMemoPadOpen] = useState(false);

    // 메모장 토글 핸들러
    const handleToggleChange = (checked: boolean) => {
        setIsMemoPadOpen(checked);
    };

    return (
        <>
            <div className="w-[714px] pl-6">
                <div className="mx-auto flex max-w-[714px] min-w-2xl flex-col gap-6 px-6 py-4">
                    <CategoryChips categories={['스포츠']} isClickable={false} bgColor="bg-main" />
                    <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                        <h1 className="text-36px-semibold flex-shrink-0">스포츠 기사</h1>
                        <div className="flex items-center gap-1">
                            <ChainIcon />
                            <h2 className="text-20px-medium text-black-70">원문링크: https://abcd.co</h2>
                        </div>
                        <div className="flex flex-1 items-center justify-end gap-1">
                            <div className="text-20px-medium text-black-70">메모장</div>
                            <ToggleSwitch onChange={handleToggleChange} checked={isMemoPadOpen} />
                        </div>
                    </div>
                    <hr className="border-black-30 w-full border-t" />
                    <div className="flex justify-center">
                        <SummarizedNewsContainer />
                    </div>
                    <AccordionTestPage />
                </div>
            </div>

            {/* 메모장 오버레이 */}
            {isMemoPadOpen && (
                <div className="fixed top-0 right-0 z-50 px-18 py-8">
                    <div className="mt-20">
                        <MemoPad articleId={articleId} />
                    </div>
                </div>
            )}

            {/* 디버깅용 정보 */}
            <div className="fixed bottom-4 left-4 rounded bg-black p-2 text-xs text-white">
                Debug: isMemoPadOpen={String(isMemoPadOpen)}, articleId={articleId}
            </div>
        </>
    );
};

export default ArticlePage;
