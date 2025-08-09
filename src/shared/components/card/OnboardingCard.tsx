import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import OnBoardingCard0 from '@/assets/OnBoardingCard0.svg?react';
import OnBoardingCard1 from '@/assets/OnBoardingCard1.svg?react';
import OnBoardingCard2 from '@/assets/OnBoardingCard2.svg?react';
import OnBoardingCard3 from '@/assets/OnBoardingCard3.svg?react';
import OnBoardingCard4 from '@/assets/OnBoardingCard4.svg?react';
import OnBoardingCard5 from '@/assets/OnBoardingCard5.svg?react';
import LeftActiveArrowIcon from '@/shared/assets/left-arrow-active.svg?react';
import LeftInactiveArrowIcon from '@/shared/assets/left-arrow-inactive.svg?react';
import RightActiveArrowIcon from '@/shared/assets/right-arrow-active.svg?react';
import RightInactiveArrowIcon from '@/shared/assets/right-arrow-inactive.svg?react';

const cards = [
    { id: 'card0', icon: OnBoardingCard0, title: 'OnBoarding Card 0' },
    { id: 'card1', icon: OnBoardingCard1, title: 'OnBoarding Card 1' },
    { id: 'card2', icon: OnBoardingCard2, title: 'OnBoarding Card 2' },
    { id: 'card3', icon: OnBoardingCard3, title: 'OnBoarding Card 3' },
    { id: 'card4', icon: OnBoardingCard4, title: 'OnBoarding Card 4' },
    { id: 'card5', icon: OnBoardingCard5, title: 'OnBoarding Card 5' },
];

export default function OnboardingCard() {
    const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: 'start' });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollTo = useCallback((index: number) => embla?.scrollTo(index), [embla]);
    const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

    const isStart = selectedIndex === 0;
    const isEnd = selectedIndex === scrollSnaps.length - 1;

    useEffect(() => {
        if (!embla) return;
        setScrollSnaps(embla.scrollSnapList());
        setSelectedIndex(embla.selectedScrollSnap());
        embla.on('select', () => setSelectedIndex(embla.selectedScrollSnap()));
    }, [embla]);

    return (
        <section className="flex h-[322px] max-w-[1135px] flex-col items-center space-y-8 px-2">
            {/* 캐러셀 박스 */}
            <div className="relative w-full">
                {/* 좌우 버튼 */}
                <button
                    onClick={scrollPrev}
                    disabled={isStart}
                    className="absolute top-1/2 -left-10 -translate-y-1/2 p-2"
                >
                    {isStart ? <LeftInactiveArrowIcon /> : <LeftActiveArrowIcon />}
                </button>

                <button
                    onClick={scrollNext}
                    disabled={isEnd}
                    className="absolute top-1/2 -right-10 -translate-y-1/2 p-2"
                >
                    {isEnd ? <RightInactiveArrowIcon /> : <RightActiveArrowIcon />}
                </button>

                {/* Embla 캐러셀 */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="scroll-snap-x scroll-snap-mandatory flex gap-7">
                        {cards.map((card) => {
                            const IconComponent = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className="scroll-snap-center flex h-[280px] flex-shrink-0 flex-col rounded-[24px]"
                                >
                                    <IconComponent className="h-full w-full object-contain" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Dot Pagination */}
            <div className="flex gap-2">
                {scrollSnaps.map((dot, i) => (
                    <button
                        key={dot}
                        onClick={() => scrollTo(i)}
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                            i === selectedIndex ? 'w-4 bg-black' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
