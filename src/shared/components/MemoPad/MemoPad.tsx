const MemoPad = () => {
    return (
        <div className="border-main flex h-[440px] w-[360px] flex-col items-center justify-center rounded-[48px] border-[2px] shadow-2xl">
            <div className="text-36px-medium mb-4 justify-center">메모장</div>
            <div className="bg-main mb-6 h-[2px] w-[300px]"></div>
            <div className="h-[280px] w-[300px] rounded-[16px] border-[2px] border-gray-400 px-2 py-3">
                <textarea
                    placeholder="메모를 입력하세요..."
                    className="h-full w-full resize-none overflow-y-scroll bg-[linear-gradient(to_bottom,transparent_31px,#94a3b8_31.5px,transparent_32px)] bg-[length:calc(100%-10px)_32px] [background-attachment:local] bg-repeat-y pr-[12px] text-[16px] leading-[32px] outline-none"
                />
            </div>
        </div>
    );
};

export default MemoPad;
