import BookMarkIcon from '@/shared/assets/Bookmark.svg?react';
import RectangleIcon from '@/shared/assets/Rectangle105.svg?react';
import ShareIcon from '@/shared/assets/Share.svg?react';

const SummarizedNews = () => {
    const newsContent =
        '간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 간추린뉴스 내용 ';
    return (
        <div className="relative top-[291px] left-[120px] flex w-[690px] flex-col rounded-[30px] border-[3px] border-[rgba(5,87,224,0.3)] bg-white px-[30px] pt-[30px] pb-[28px]">
            <div className="flex justify-between">
                <div className="flex space-x-[8px]">
                    <RectangleIcon />
                    <span className="text-28px-semibold relative top-[-10px] text-black">간추린 뉴스</span>
                </div>
                <div className="flex gap-[21px]">
                    <BookMarkIcon />
                    <ShareIcon />
                </div>
            </div>
            <div className="text-18px-medium mt-[5px] break-words text-gray-900">{newsContent}</div>
        </div>
    );
};

export default SummarizedNews;
