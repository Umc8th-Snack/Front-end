import { useNavigate } from 'react-router-dom';

import ArrowUpright from '@/pages/my/assets/arrow-up-right.svg?react';

interface MemoCardProps {
    date: string;
    content: string;
    articleId: number;
}
//개별 메모카드 컴포넌트
const MemoCard = ({ date, content, articleId }: MemoCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="border-main-70 w-full rounded-lg border p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
                <span className="text-base font-medium md:text-lg">{date}</span>
                <button
                    className="-m-1 shrink-0 cursor-pointer p-1"
                    onClick={() => void navigate(`/articles/${articleId}`)}
                    aria-label="기사로 이동"
                >
                    <ArrowUpright className="h-5 w-5 md:h-6 md:w-6" />
                </button>
            </div>
            <p className="text-black-70 mt-2 line-clamp-4 text-sm leading-relaxed md:line-clamp-5 md:text-base">
                {content}
            </p>
        </div>
    );
};

export default MemoCard;
