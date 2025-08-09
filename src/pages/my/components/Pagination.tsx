import LeftPaginationActive from '@/pages/my/assets/left-pagination-active.svg?react';
import LeftPaginationInactive from '@/pages/my/assets/left-pagination-inactive.svg?react';
import RightPaginationActive from '@/pages/my/assets/right-pagination-active.svg?react';
import RightPaginationInactive from '@/pages/my/assets/right-pagination-inactive.svg?react';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

//시작 페이지와 끝 페이지 지정
const isStart = (currentPage: number) => currentPage === 1;
const isEnd = (currentPage: number, totalPages: number) => currentPage === totalPages;

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pagesPerGroup = 5;
    const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="mt-6 flex justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isStart(currentPage)}
                className={`${isStart(currentPage) ? 'cursor-default' : 'cursor-pointer'} px-2`}
            >
                {isStart(currentPage) ? <LeftPaginationInactive /> : <LeftPaginationActive />}
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`text-24px-medium px-3 py-1 ${currentPage === page ? 'text-main cursor-pointer' : 'text-black-30 cursor-pointer'}`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isEnd(currentPage, totalPages)}
                className={`${isEnd(currentPage, totalPages) ? 'cursor-default' : 'cursor-pointer'} px-2`}
            >
                {isEnd(currentPage, totalPages) ? <RightPaginationInactive /> : <RightPaginationActive />}
            </button>
        </div>
    );
};

export default Pagination;
