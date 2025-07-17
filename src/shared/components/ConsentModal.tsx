// TODO: 폴더 구조 설정 후 XIcon 위치 바꾸기, SVGR로 변경
import React, { useEffect, useRef, useState } from 'react';

import ToggleSwitch from '@/shared/components/ToggleSwitch/ToggleSwitch';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
);

interface Props {
    onClose: () => void;
}

const ConsentModal: React.FC<Props> = ({ onClose }) => {
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
            <div
                ref={modalRef}
                className="relative h-[250px] w-[440px] rounded-[8px] bg-white shadow-[0px_2.5px_2.5px_rgba(0,0,0,0.25)]"
            >
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[8px] right-[8px] flex h-[24px] w-[24px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon className="text-black" />
                </button>

                {/* 제목 */}
                <div className="text-28px-semibold absolute top-[25px] left-1/2 h-[42px] w-[159px] -translate-x-1/2">
                    정보 동의 설정
                </div>

                {/* PR #67의 토글 스위치 UI 사용 */}
                <div className="mt-[125px] flex flex-col items-center space-y-4">
                    {/* 개인정보 수집 및 이용 동의 */}
                    <div className="flex w-[348px] items-center justify-between">
                        <span className="text-24px-medium text-black-70 ml-[2px]">개인정보 수집 및 이용 동의</span>
                        <ToggleSwitch checked={personalInfoConsent} onChange={setPersonalInfoConsent} />
                    </div>

                    {/* 광고성 정보 수신 동의 */}
                    <div className="flex w-[348px] items-center justify-between">
                        <span className="text-24px-medium text-black-70 ml-[2px]">광고성 정보 수신 동의</span>
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
