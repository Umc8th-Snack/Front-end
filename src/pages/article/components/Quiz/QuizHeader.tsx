import BookmarkIcon from '@/shared/assets/Bookmark.svg?react';
import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';
import ShareIcon from '@/shared/assets/Share.svg?react';

/**
 * 퀴즈 해설 페이지의 헤더 컴포넌트
 * 제목, 북마크, 공유 버튼을 포함
 */

const QuizHeader = () => {
    return (
        <>
            <div className="flex items-center justify-between pb-6">
                <div className="flex items-center gap-2">
                    <RectangleIcon />
                    <h1 className="text-28px-semibold">해설</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <BookmarkIcon className="h-[24px] w-[24px]" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                        <ShareIcon className="h-[24px] w-[24px]" />
                    </button>
                </div>
            </div>
            <div className="mb-4 border-t border-gray-300" />
        </>
    );
};

export default QuizHeader;
