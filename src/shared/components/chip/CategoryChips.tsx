import { useState } from 'react';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    bgColor?: string;
    isClickable?: boolean;
}

function Chip({ label, selected, onClick, bgColor, isClickable = true }: ChipProps) {
    return (
        <button
            className={`text-14px-medium sm:text-16px-medium lg:text-18px-medium h-[40px] w-full min-w-[100px] cursor-pointer rounded-full md:w-[100px] ${
                !isClickable
                    ? 'bg-main text-white'
                    : selected
                      ? bgColor
                          ? `${bgColor} text-white`
                          : 'bg-main text-white'
                      : 'border border-black bg-white text-black'
            } transition hover:opacity-80 ${!isClickable ? 'pointer-events-none' : ''}`}
            onClick={isClickable ? onClick : undefined}
            type="button"
        >
            {label}
        </button>
    );
}

interface CategoryChipProps {
    categories: string[];
    initialSelected?: string[];
    selected?: string[]; // controlled mode를 위한 prop
    onChange?: (selected: string[]) => void;
    bgColor?: string;
    isClickable?: boolean;
}

function CategoryChips({
    categories,
    initialSelected = [],
    selected,
    onChange,
    bgColor,
    isClickable = true,
}: CategoryChipProps) {
    // controlled mode (selected prop이 있을 때) vs uncontrolled mode
    const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set(initialSelected));
    const selectedSet = selected ? new Set(selected) : internalSelected;

    const handleClick = (label: string) => {
        const newSet = new Set(selectedSet);
        newSet.has(label) ? newSet.delete(label) : newSet.add(label);
        const newArray = [...newSet];

        // controlled mode가 아닐 때만 내부 상태 업데이트
        if (!selected) {
            setInternalSelected(newSet);
        }

        onChange?.(newArray);
    };

    return (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-6 md:grid-cols-7 lg:grid-cols-9">
            {categories.map((label) => (
                <Chip
                    key={label}
                    label={label}
                    selected={selectedSet.has(label)}
                    onClick={() => handleClick(label)}
                    bgColor={bgColor}
                    isClickable={isClickable}
                />
            ))}
        </div>
    );
}

export default CategoryChips;
