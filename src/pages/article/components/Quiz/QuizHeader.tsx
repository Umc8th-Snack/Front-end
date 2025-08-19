import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';

/* 퀴즈 해설 페이지의 헤더 컴포넌트 */

const QuizHeader = () => {
    return (
        <>
            <div className="flex items-center justify-between pb-4 lg:pb-6">
                <div className="flex items-center gap-2">
                    <RectangleIcon className="h-5 w-5 md:h-7 md:w-7" />
                    <h1 className="text-20px-semibold md:text-28px-semibold relative">해설</h1>
                </div>
            </div>
            <div className="border-black-30 mb-4 border-t" />
        </>
    );
};

export default QuizHeader;
