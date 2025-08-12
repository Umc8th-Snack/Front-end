import { useEffect, useRef } from 'react';

interface SearchDropdownProps {
    open: boolean;
    suggestions: string[];
    onSelect: (value: string) => void;
    setOpen: (open: boolean) => void;
}

const SearchDropdown = ({ open, suggestions, onSelect, setOpen }: SearchDropdownProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setOpen]);

    if (!open || suggestions.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="border-main pointer-events-none absolute inset-x-0 top-full z-50 -mt-px origin-top scale-y-95 overflow-hidden rounded-b-[24px] border border-t-0 bg-white opacity-0 shadow-lg transition-opacity transition-transform duration-1200 ease-out data-[open=true]:pointer-events-auto data-[open=true]:scale-y-100 data-[open=true]:opacity-100"
            data-open={open}
        >
            {suggestions.map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => {
                        onSelect(item);
                        setOpen(false);
                    }}
                    className="text-main-70 text-18px-medium lg:text-20px-medium hover:bg-main/5 block w-full px-4 py-2 pl-5 text-left"
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default SearchDropdown;
