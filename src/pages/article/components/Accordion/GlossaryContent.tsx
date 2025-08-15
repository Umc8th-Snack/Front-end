import type { GlossaryItem } from '@/pages/article/types/accordionTypes';

interface GlossaryContentProps {
    data: GlossaryItem[];
}

const GlossaryContent = ({ data }: GlossaryContentProps) => {
    if (!data?.length) return null;

    return (
        <div className="border-black-30 mb-4 space-y-3 rounded-2xl border-1 bg-white p-6">
            {data.map((item, index) => (
                <div key={`${item.word}-${item.createdAt}-${index}`} className="space-y-2">
                    <div className="text-main text-sm font-bold text-black">{item.word}</div>

                    <div className="mb-2 space-y-1">
                        {(item.definitions?.length ? item.definitions : ['정의가 없습니다.']).map((def, i) => (
                            <div key={i} className="text-black-70 text-sm">
                                {def}
                            </div>
                        ))}
                    </div>

                    {index < data.length - 1 && <div className="border-black-30 border-b" />}
                </div>
            ))}
        </div>
    );
};

export default GlossaryContent;
