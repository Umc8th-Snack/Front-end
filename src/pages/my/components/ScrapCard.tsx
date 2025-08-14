import { useNavigate } from 'react-router-dom';

import ArrowUpright from '@/pages/my/assets/arrow-upright.svg';

interface ScrapCardProps {
    title: string;
    summary: string;
    articleId: number;
}

const ScrapCard = ({ title, summary, articleId }: ScrapCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="border-main-70 h-[172px] w-[672px] rounded-[8px] border p-4">
            <div className="flex items-center justify-between">
                <div className="text-20px-bold text-black">{title}</div>
                <button
                    className="top-3 right-3 cursor-pointer"
                    onClick={() => void navigate(`/articles/${articleId}`)}
                >
                    <ArrowUpright />
                </button>
            </div>
            <p className="text-20px-medium text-black-70 mt-2">{summary}</p>
        </div>
    );
};

export default ScrapCard;
