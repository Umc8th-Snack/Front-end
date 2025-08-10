import SummarizedNewsContainer from '@/pages/article/components/SummarizedNewsContainer/SummarizedNewsContainer';
import AccordionTestPage from '@/pages/test/AccordionTestPage';
import ChainIcon from '@/shared/assets/icons/chain-icon.svg?react';
import ToggleSwitch from '@/shared/components/button/ToggleSwitch';
import CategoryChips from '@/shared/components/chip/CategoryChips';

const ArticlePage = () => {
    const handleToggleChange = (_checked: boolean) => {
        handleToggle(_checked);
    };

    return (
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
                        <ToggleSwitch onChange={handleToggleChange} checked={false} />
                    </div>
                </div>
                <hr className="border-black-30 w-full border-t" />
                <div className="flex justify-center">
                    <SummarizedNewsContainer />
                </div>
                <AccordionTestPage />
            </div>
        </div>
    );
};

export default ArticlePage;

function handleToggle(_checked: boolean) {
    throw new Error('Function not implemented.');
}
