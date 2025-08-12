import { useEffect, useRef } from 'react';

type SearchHistoryDropdownProps = {
    open: boolean;
    searchHistory: string[];
    onSelect: (value: string) => void;
    setOpen: (open: boolean) => void;
};

const SearchHistoryDropdown = ({ open, searchHistory, onSelect, setOpen }: SearchHistoryDropdownProps) => {
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

    if (!open || searchHistory.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="border-main pointer-events-none absolute inset-x-0 top-full z-50 -mt-px origin-top scale-y-95 overflow-hidden rounded-b-[24px] border border-t-0 bg-white opacity-0 shadow-lg transition-opacity transition-transform duration-4000 ease-in-out data-[open=true]:pointer-events-auto data-[open=true]:scale-y-100 data-[open=true]:opacity-100"
            data-open={open}
        >
            {searchHistory.map((item, idx) => (
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

export default SearchHistoryDropdown;
