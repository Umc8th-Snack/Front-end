type TabMenuProps = {
    tab: 'memo' | 'scrap';
    onChange: (tab: 'memo' | 'scrap') => void;
};

const TabMenu = ({ tab, onChange }: TabMenuProps) => {
    return (
        <div className="mb-4 flex">
            <button
                className={`text-24px-semibold flex-1 cursor-pointer border-b-2 py-1 text-center transition-colors duration-200 ${
                    tab === 'memo' ? 'border-main text-main' : 'border-black-30 text-black-30'
                }`}
                onClick={() => onChange('memo')}
            >
                메모장
            </button>
            <button
                className={`text-24px-semibold flex-1 cursor-pointer border-b-2 py-1 text-center transition-colors duration-200 ${
                    tab === 'scrap' ? 'border-main text-main' : 'border-black-30 text-black-30'
                }`}
                onClick={() => onChange('scrap')}
            >
                스크랩
            </button>
        </div>
    );
};

export default TabMenu;
