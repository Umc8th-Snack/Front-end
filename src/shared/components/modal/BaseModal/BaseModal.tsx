import React, { useCallback, useEffect } from 'react';

import XIcon from '@/shared/assets/icons/close-x.svg?react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    height?: string;
    borderRadius?: string;
    disableBackgroundClose?: boolean;
    disableEscClose?: boolean;
    showCloseButton?: boolean;
}

const BaseModal = ({
    isOpen,
    onClose,
    children,
    width = '400px',
    height = '300px',
    borderRadius = '10px',
    disableBackgroundClose = false,
    disableEscClose = false,
    showCloseButton = true,
}: BaseModalProps) => {
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !disableEscClose) {
                onClose();
            }
        },
        [onClose, disableEscClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" aria-hidden="true">
            <div
                role="dialog"
                aria-modal="true"
                className="relative bg-white shadow-[0px_2.5px_2.5px_rgba(0,0,0,0.25)]"
                style={{ width, height, borderRadius }}
            >
                {!disableBackgroundClose && (
                    <button
                        type="button"
                        className="absolute inset-0 z-40"
                        onClick={onClose}
                        aria-label="Close modal by clicking background"
                    />
                )}

                {showCloseButton && (
                    <button
                        type="button"
                        aria-label="Close modal"
                        className="absolute top-[12px] right-[8px] z-50 cursor-pointer"
                        onClick={onClose}
                    >
                        <XIcon />
                    </button>
                )}
                <div className="relative z-10 h-full w-full overflow-auto p-12">{children}</div>
            </div>
        </div>
    );
};

export default BaseModal;
