import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = ({ label, className, ...props }: InputProps) => {
    return (
        <div className="my-8 flex w-full flex-col gap-2">
            {label && <label className="text-[20px] font-medium text-gray-700">{label}</label>}
            <input
                {...props}
                className={`rounded-md border border-[#B2B2B2] px-4 py-3 text-[20px] transition placeholder:text-[#B2B2B2] hover:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none ${className ?? ''}`}
            />
        </div>
    );
};

export default Input;
