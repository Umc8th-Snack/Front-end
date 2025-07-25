import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

import LeftActiveArrowIcon from '@/shared/assets/left-arrow-active.svg?react';
import LeftInactiveArrowIcon from '@/shared/assets/left-arrow-inactive.svg?react';
import RightActiveArrowIcon from '@/shared/assets/right-arrow-active.svg?react';
import RightInactiveArrowIcon from '@/shared/assets/right-arrow-inactive.svg?react';

const cards = [
    { id: '카드 1', description: 'text' },
    { id: '카드 2', description: 'text' },
    { id: '카드 3', description: 'text' },
];

export default function OnboardingCard() {
    const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: 'center' });
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
        <section className="relative top-[195px] flex h-[280px] w-[1200px] flex-col items-center space-y-10 px-2">
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
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className="scroll-snap-center flex h-[280px] min-w-[50%] flex-shrink-0 flex-col justify-center rounded-[24px] border border-gray-400 bg-white p-10"
                            >
                                <h3 className="mb-2 text-xl font-bold">{card.id}</h3>
                                <p className="text-lg text-gray-700">{card.description}</p>
                            </div>
                        ))}
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
