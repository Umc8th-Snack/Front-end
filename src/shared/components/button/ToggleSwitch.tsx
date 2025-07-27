import { useCallback } from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

const ToggleSwitch = ({ checked, onChange, disabled = false }: ToggleSwitchProps) => {
    const handleToggle = useCallback(() => {
        if (!disabled) {
            onChange(!checked);
        }
    }, [checked, onChange, disabled]);

    return (
        <button
            type="button"
            onClick={handleToggle}
            disabled={disabled}
            className={`relative h-[24px] w-[48px] rounded-full transition-colors duration-[var(--animate-duration-normal)] ${checked ? 'bg-[var(--color-main)]' : 'bg-[var(--color-black-50)]'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} [box-shadow:inset_2px_2px_2px_0_rgba(0,0,0,0.25)]`}
        >
            <span
                className={`absolute top-[2px] left-[2px] aspect-square h-[20px] rounded-full bg-white shadow-[0_0_1px_1px_rgba(0,0,0,0.25)] transition-transform duration-[var(--animate-duration-normal)] ${checked ? 'translate-x-6' : 'translate-x-0'} `}
            />
        </button>
    );
};

export default ToggleSwitch;
