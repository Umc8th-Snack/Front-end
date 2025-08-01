import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const InputBox = ({ label, className, ...props }: InputProps) => {
    return (
        <div className="my-1 flex w-full flex-col gap-1">
            {label && <label className="text-18px-medium text-black">{label}</label>}
            <input
                {...props}
                className={`text-18px-medium hover:border-main focus:ring-main rounded-md border border-[#B2B2B2] px-4 py-3 transition placeholder:text-[#B2B2B2] focus:ring-1 focus:outline-none ${className ?? ''}`}
            />
        </div>
    );
};

export default InputBox;
