import { useEffect, useState } from 'react';

interface ShareToastProps {
    message: string;
    duration?: number; // ms 단위
    onDone?: () => void; // 토스트가 사라질 때 호출
}

function ShareToast({ message, duration = 500, onDone }: ShareToastProps) {
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
            className={`bg-black-70 fixed bottom-20 left-1/2 z-[9999] flex min-h-[48px] w-auto max-w-[320px] -translate-x-1/2 items-center justify-center rounded-lg px-6 py-3 pt-[env(safe-area-inset-bottom,0px)] pb-[env(safe-area-inset-bottom,0px)] text-center break-words whitespace-pre-line text-white shadow-lg transition-opacity duration-300 sm:max-w-[420px] sm:shadow-xl md:min-h-[56px] md:max-w-[520px] md:px-8 md:py-4 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
            role="alert"
            aria-live="assertive"
        >
            <span className="text-16px-semibold sm:text-20px-semibold md:text-24px-semibold flex flex-1 items-center justify-center text-center leading-normal break-words whitespace-normal">
                {message}
            </span>
        </div>
    );
}

export default ShareToast;
