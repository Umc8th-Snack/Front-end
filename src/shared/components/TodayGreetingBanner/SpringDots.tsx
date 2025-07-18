import type { SVGProps } from 'react';

const SpringDots = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg viewBox="0 0 32 82" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M27 12C27 12 13.2589 12.3006 9.34889 11.7586C-1.40351 10.2682 2.9952 1.99969 5.92767 1.99969"
                stroke="#0557E0"
                strokeWidth="4"
            />
            <path
                d="M27 44C27 44 13.2589 44.3006 9.34889 43.7586C-1.40351 42.2682 2.9952 33.9997 5.92767 33.9997"
                stroke="#0557E0"
                strokeWidth="4"
            />
            <path
                d="M27 76C27 76 13.2589 76.3006 9.34889 75.7586C-1.40351 74.2682 2.9952 65.9997 5.92767 65.9997"
                stroke="#0557E0"
                strokeWidth="4"
            />
            <circle cx="25" cy="14" r="6" fill="#0557E0" />
            <circle cx="25" cy="46" r="6" fill="#0557E0" />
            <circle cx="25" cy="78" r="6" fill="#0557E0" />
        </svg>
    );
};

export default SpringDots;
