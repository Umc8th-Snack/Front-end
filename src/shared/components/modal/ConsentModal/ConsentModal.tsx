import React, { useEffect, useRef, useState } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';
import ToggleSwitch from '@/shared/components/button/ToggleSwitch';

interface ConsentModalProps {
    onClose: () => void;
}

const ConsentModal = ({ onClose }: ConsentModalProps) => {
    const [personalInfoConsent, setPersonalInfoConsent] = useState(true);
    const [adInfoConsent, setAdInfoConsent] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={handleOverlayClick}
            onKeyDown={handleOverlayKeyDown}
            tabIndex={-1}
            role="button"
            aria-label="Close modal"
        >
            <div
                ref={modalRef}
                className="relative h-auto max-h-screen w-[80%] max-w-[335px] rounded-[10px] bg-white px-8 py-6 shadow-[0px_2.5px_2.5px_rgba(0,0,0,0.25)] sm:px-10 sm:py-8"
            >
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[12px] right-[8px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon />
                </button>

                {/* 제목 */}
                <div className="text-20px-semibold sm:text-24px-semibold mb-6 text-center">정보 동의 설정</div>

                <div className="flex flex-col items-center space-y-4 pt-2 pb-3 sm:pb-1">
                    {/* 개인정보 수집 및 이용 동의 */}
                    <div className="flex w-full items-center justify-between">
                        <span className="text-16px-medium sm:text-18px-medium text-black-70">
                            개인정보 수집 및 이용 동의
                        </span>
                        <ToggleSwitch checked={personalInfoConsent} onChange={setPersonalInfoConsent} />
                    </div>

                    {/* 광고성 정보 수신 동의 */}
                    <div className="flex w-full items-center justify-between">
                        <span className="text-16px-medium sm:text-18px-medium text-black-70">
                            광고성 정보 수신 동의
                        </span>
                        <ToggleSwitch checked={adInfoConsent} onChange={setAdInfoConsent} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// TODO: 테스트용 더미 컴포넌트, 실제 사용시 삭제
export const DummyConsentModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    if (!isOpen) return null;

    return <ConsentModal onClose={handleClose} />;
};

export default ConsentModal;
