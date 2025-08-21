import LeftPaginationActive from '@/pages/my/assets/left-pagination-active.svg?react';
import LeftPaginationInactive from '@/pages/my/assets/left-pagination-inactive.svg?react';
import RightPaginationActive from '@/pages/my/assets/right-pagination-active.svg?react';
import RightPaginationInactive from '@/pages/my/assets/right-pagination-inactive.svg?react';
import type { PaginationProps } from '@/pages/my/types/types';

const isStart = (currentPage: number) => currentPage === 1;
const isEnd = (currentPage: number, totalPages: number) => currentPage === totalPages;

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const pagesPerGroup = 5;
    const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <nav className="mt-4 flex justify-center gap-1.5 sm:mt-6 sm:gap-2 md:gap-3" aria-label="페이지네이션">
            {/* Prev */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={isStart(currentPage)}
                aria-label="이전 페이지"
                className={`rounded-md px-1.5 py-1 sm:px-2 md:px-2.5 ${isStart(currentPage) ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-neutral-100 active:scale-[0.99]'} `}
            >
                {isStart(currentPage) ? (
                    <LeftPaginationInactive className="h-4 w-4 md:h-5 md:w-5" />
                ) : (
                    <LeftPaginationActive className="h-4 w-4 md:h-5 md:w-5" />
                )}
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page) => {
                const isActive = currentPage === page;
                return (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`text-md rounded-md px-2 py-1 lg:text-lg ${isActive ? 'text-main font-semibold' : 'text-black-30 hover:text-neutral-700'} cursor-pointer hover:bg-neutral-100 active:scale-[0.99]`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next */}
            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={isEnd(currentPage, totalPages)}
                aria-label="다음 페이지"
                className={`rounded-md px-1.5 py-1 sm:px-2 md:px-2.5 ${isEnd(currentPage, totalPages) ? 'cursor-default opacity-50' : 'cursor-pointer hover:bg-neutral-100 active:scale-[0.99]'} `}
            >
                {isEnd(currentPage, totalPages) ? (
                    <RightPaginationInactive className="h-4 w-4 md:h-6 md:w-6" />
                ) : (
                    <RightPaginationActive className="h-4 w-4 md:h-5 md:w-5" />
                )}
            </button>
        </nav>
    );
};

export default Pagination;
