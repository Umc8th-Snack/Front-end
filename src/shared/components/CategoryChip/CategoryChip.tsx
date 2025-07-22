interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

function CategoryChip({ label, selected, onClick }: ChipProps) {
    return (
        <button
            className={`text-18px-medium h-[40px] w-[100px] cursor-pointer rounded-full ${selected ? 'bg-main text-white' : 'border border-black bg-white text-black'} transition hover:opacity-80`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

export default CategoryChip;
