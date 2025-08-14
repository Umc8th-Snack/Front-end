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
        <div className="border-main-70 h-[172px] w-[672px] rounded-[8px] border p-4">
            <div className="flex items-center justify-between">
                <span className="text-24px-medium">{date}</span>
                <button
                    className="top-3 right-3 cursor-pointer"
                    onClick={() => void navigate(`/articles/${articleId}`)}
                >
                    <ArrowUpright />
                </button>
            </div>
            <p className="text-20px-medium text-black-70 mt-2">{content}</p>
        </div>
    );
};

export default MemoCard;
