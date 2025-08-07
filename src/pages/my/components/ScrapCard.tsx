const ScrapCard = ({ title, summary }: { title: string; summary: string }) => (
    <div className="border-main-70 h-[172px] w-[672px] rounded-[8px] border p-4">
        <div className="text-20px-bold text-black">{title}</div>
        <p className="text-20px-medium text-black-70 mt-2">{summary}</p>
    </div>
);

export default ScrapCard;
