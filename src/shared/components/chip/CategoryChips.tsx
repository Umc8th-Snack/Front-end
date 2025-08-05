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
            className={`text-18px-medium h-[40px] w-[100px] cursor-pointer rounded-full ${
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
    onChange?: (selected: string[]) => void;
    bgColor?: string;
    isClickable?: boolean;
}

function CategoryChips({ categories, initialSelected = [], onChange, bgColor, isClickable = true }: CategoryChipProps) {
    const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set(initialSelected));

    const handleClick = (label: string) => {
        setSelectedSet((prev) => {
            const newSet = new Set(prev);
            newSet.has(label) ? newSet.delete(label) : newSet.add(label);
            onChange?.([...newSet]);
            return newSet;
        });
    };

    return (
        <div className="mt-4 flex gap-4">
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
