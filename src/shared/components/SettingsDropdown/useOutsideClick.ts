import React, { useEffect } from 'react';

export const useOutsideClick = <T extends HTMLElement>(ref: React.RefObject<T>, onClose: () => void) => {
    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, [ref, onClose]);
};
