import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const SERVICE_CLOSURE_DISMISS_KEY = 'snack-service-closure-dismissed-on';

const getTodayKey = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
};

interface ServiceClosureModalProps {
    onClose: () => void;
    onDismissForToday: () => void;
}

const ServiceClosureModal = ({ onClose, onDismissForToday }: ServiceClosureModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handlePointerDown = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handlePointerDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handlePointerDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 px-4 py-8">
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="service-closure-heading"
                className="relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[32px] bg-white px-6 py-7 text-left shadow-[0_25px_80px_rgba(11,26,60,0.35)] sm:px-10 sm:py-10"
            >
                <button
                    type="button"
                    aria-label="모달 닫기"
                    onClick={onClose}
                    className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-2xl text-black transition hover:bg-black/10"
                >
                    &times;
                </button>

                <p className="text-main text-[12px] font-semibold tracking-[0.4em] uppercase">SNACK 공지</p>
                <h1
                    id="service-closure-heading"
                    className="mt-4 text-[28px] leading-snug font-bold text-[#0b1a3c] sm:text-[32px]"
                >
                    📢 SNACK 서비스 임시 종료 공지
                </h1>
                <p className="text-black-60 mt-3 text-base sm:text-lg">
                    2025년 11월 11일(화)부로 SNACK 서비스가 종료됩니다.
                </p>

                <div className="mt-8 space-y-5">
                    <section className="rounded-3xl bg-[#f7f9ff] px-6 py-6">
                        <h2 className="text-lg font-semibold text-[#0b1a3c]">📅 서비스 종료 및 일정 안내</h2>
                        <div className="text-black-70 mt-4 space-y-3 text-base leading-relaxed">
                            <p>안녕하세요. SNACK 서비스를 이용해 주셔서 진심으로 감사합니다.</p>
                            <p>2025년 11월 11일(화)부로 SNACK 서비스가 종료됨을 알려드립니다.</p>
                            <p>서비스 종료와 함께 지금까지 보내주신 의견과 데이터는 모두 안전하게 파기됩니다.</p>
                            <p>향후 SNACK 서비스 이용이 어려운 점 양해 부탁드립니다.</p>
                        </div>
                    </section>

                    <section className="rounded-3xl bg-[#fff7f2] px-6 py-6">
                        <h2 className="text-lg font-semibold text-[#0b1a3c]">🙏 여러분께 드리는 감사의 인사</h2>
                        <div className="text-black-70 mt-4 space-y-3 text-base leading-relaxed">
                            <p>그동안 SNACK에 보내주신 관심과 애정 덕분에 여기까지 올 수 있었습니다.</p>
                            <p>
                                여러분이 남겨주신 응원과 피드백은 더 나은 서비스를 만들기 위한 소중한 밑거름이었습니다.
                            </p>
                            <p>
                                이번 경험을 바탕으로 앞으로도 당신의 일상을 돕는 제품을 만들기 위해 계속해서
                                고민하겠습니다.
                            </p>
                            <p>다시 한 번 SNACK과 함께해 주신 모든 분들께 진심으로 감사드립니다.</p>
                            <p>SNACK 드림</p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-black/5 px-6 py-5">
                        <h2 className="text-lg font-semibold text-[#0b1a3c]">문의</h2>
                        <a
                            className="text-main mt-3 inline-flex items-center text-base font-semibold"
                            href="mailto:liz0824@naver.com"
                        >
                            liz0824@naver.com
                        </a>
                    </section>
                </div>

                <p className="text-black-60 mt-8 text-center text-base">
                    따뜻한 응원에 다시 한 번 감사드리며, 더 좋은 모습으로 찾아뵙겠습니다.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onDismissForToday}
                        className="text-16px-semibold bg-main hover:bg-main-70 flex-1 rounded-2xl px-6 py-4 text-white transition"
                    >
                        오늘 하루 이 안내 다시 보지 않기
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-16px-semibold flex-1 rounded-2xl border border-black/10 px-6 py-4 text-black transition hover:bg-black/5"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

const useServiceClosurePopup = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let shouldOpen = false;
        try {
            const todayKey = getTodayKey();
            const storedKey = window.localStorage.getItem(SERVICE_CLOSURE_DISMISS_KEY);
            shouldOpen = storedKey !== todayKey;
        } catch {
            shouldOpen = true;
        }

        if (shouldOpen) {
            setIsModalOpen(true);
        }
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const dismissForToday = useCallback(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(SERVICE_CLOSURE_DISMISS_KEY, getTodayKey());
            } catch {
                // ignore storage errors
            }
        }
        setIsModalOpen(false);
    }, []);

    const serviceClosureModal: ReactNode = isModalOpen ? (
        <ServiceClosureModal onClose={closeModal} onDismissForToday={dismissForToday} />
    ) : null;

    return { serviceClosureModal };
};

export default useServiceClosurePopup;
