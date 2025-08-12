import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';

/* 퀴즈 해설 페이지의 헤더 컴포넌트 */

const QuizHeader = () => {
    return (
        <>
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-2">
                    <RectangleIcon />
                    <h1 className="text-28px-semibold">해설</h1>
                </div>
            </div>
            <div className="border-black-30 mb-4 border-t" />
        </>
    );
};

export default QuizHeader;
