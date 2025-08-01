interface Props {
    link: string;
    onCopy: () => void;
}

function CopyLinkBox({ link, onCopy }: Props) {
    return (
        <div className="flex h-[60px] w-full max-w-[456px] items-center rounded-[8px] border border-black/50 px-[10px]">
            <input
                className="text-20px-medium text-black-70 ml-[4px] flex-1 bg-transparent outline-none"
                value={link}
                readOnly
            />
            <button
                onClick={() => void onCopy()}
                className="bg-main text-18px-medium h-[40px] w-[80px] shrink-0 cursor-pointer rounded-[8px] text-white"
            >
                복사
            </button>
        </div>
    );
}

export default CopyLinkBox;
