import { useEffect, useRef, useState } from 'react';

import { SCROLL_CONFIG } from '@/pages/article/constants/quiz';

/**
 * 퀴즈 해설 페이지의 스크롤 관리
 * 스크롤이 하단에 도달하면 결과 표시해 줌!
 */

export const useQuizScroll = (onScrollToBottom: () => void) => {
    const [showResultMessage, setShowResultMessage] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - SCROLL_CONFIG.THRESHOLD;

                if (isAtBottom && !showResultMessage) {
                    setShowResultMessage(true);
                    onScrollToBottom();
                }
            }
        };

        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }

        return undefined;
    }, [showResultMessage, onScrollToBottom]);

    return { scrollRef, showResultMessage };
};
