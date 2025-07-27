import { useEffect, useState } from 'react';

interface Props {
    message: string;
    duration?: number; // ms 단위
    onDone?: () => void; // 토스트가 사라질 때 호출
}

function ShareToast({ message, duration = 500, onDone }: Props) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, duration);

        const cleanup = setTimeout(() => {
            onDone?.();
        }, duration + 300); // fade-out 시간 고려

        return () => {
            clearTimeout(timer);
            clearTimeout(cleanup);
        };
    }, [duration, onDone]);

    return (
        <div
            className={`bg-black-70 fixed top-[85vh] left-1/2 z-[9999] flex h-[80px] w-[400px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[8px] text-white shadow-md transition-opacity duration-300 ${
                fadeOut ? 'opacity-0' : 'opacity-100'
            }`}
            role="alert"
        >
            <span className="text-24px-semibold">{message}</span>
        </div>
    );
}

export default ShareToast;
