type TabMenuProps = {
    tab: 'memo' | 'scrap';
    onChange: (tab: 'memo' | 'scrap') => void;
};

const TabMenu = ({ tab, onChange }: TabMenuProps) => {
    return (
        <div className="sticky top-0 z-10 mb-3 flex gap-2 bg-white/90 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/70 md:mb-4">
            <button
                className={`flex-1 cursor-pointer border-b-2 py-2 text-center text-base font-semibold transition-colors md:text-lg ${tab === 'memo' ? 'border-main text-main' : 'border-black-30 text-black-30'}`}
                onClick={() => onChange('memo')}
            >
                메모장
            </button>
            <button
                className={`flex-1 cursor-pointer border-b-2 py-2 text-center text-base font-semibold transition-colors md:text-lg ${tab === 'scrap' ? 'border-main text-main' : 'border-black-30 text-black-30'}`}
                onClick={() => onChange('scrap')}
            >
                스크랩
            </button>
        </div>
    );
};

export default TabMenu;
