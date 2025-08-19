import { useEffect, useRef, useState } from 'react';

import { SCROLL_CONFIG } from '@/pages/article/constants/quiz';

/**
 * 퀴즈 해설 페이지의 스크롤 관리
 * lg 미만: 결과 메시지 즉시 표시
 * lg 이상: 스크롤이 하단에 도달하면 결과 표시
 */

export const useQuizScroll = (onScrollToBottom: () => void) => {
    const [showResultMessage, setShowResultMessage] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 화면 크기 체크
    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 1024); // lg 브레이크포인트
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    useEffect(() => {
        // lg 미만에서는 결과 메시지 즉시 표시
        if (!isLargeScreen) {
            setShowResultMessage(true);
            return;
        }

        // lg 이상에서만 스크롤 이벤트 처리
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
    }, [showResultMessage, onScrollToBottom, isLargeScreen]);

    return { scrollRef, showResultMessage: isLargeScreen ? showResultMessage : true };
};
