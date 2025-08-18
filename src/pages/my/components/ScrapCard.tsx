import { useNavigate } from 'react-router-dom';

import ArrowUpright from '@/pages/my/assets/arrow-up-right.svg?react';

interface ScrapCardProps {
    title: string;
    summary: string;
    articleId: number;
}

const ScrapCard = ({ title, summary, articleId }: ScrapCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="border-main-70 w-full rounded-lg border p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
                <div className="line-clamp-2 text-base font-semibold text-black md:text-lg">{title}</div>
                <button
                    className="-m-1 shrink-0 cursor-pointer p-1"
                    onClick={() => void navigate(`/articles/${articleId}`)}
                    aria-label="기사로 이동"
                >
                    <ArrowUpright className="h-5 w-5 md:h-6 md:w-6" />
                </button>
            </div>
            <p className="text-black-70 mt-2 line-clamp-3 text-sm leading-relaxed md:line-clamp-4 md:text-base">
                {summary}
            </p>
        </div>
    );
};

export default ScrapCard;
