const ScrapCard = ({ title, summary: excerpt }: { title: string; summary: string }) => (
    <div className="border-main-70 h-[172px] w-[672px] rounded-[8px] border p-4">
        <div className="text-24px-medium text-black">{title}</div>
        <p className="text-20px-medium text-black-70 mt-2">{excerpt}</p>
    </div>
);

export default ScrapCard;
