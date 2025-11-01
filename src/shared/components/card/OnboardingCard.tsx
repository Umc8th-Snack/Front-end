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
import { SNACKER_NOTION_URL } from '@/shared/constants/urlConstants';

const cards = [
    { id: 'card0', icon: OnBoardingCard0, title: 'OnBoarding Card 0' },
    { id: 'card1', icon: OnBoardingCard1, title: 'OnBoarding Card 1' },
    { id: 'card2', icon: OnBoardingCard2, title: 'OnBoarding Card 2' },
    { id: 'card3', icon: OnBoardingCard3, title: 'OnBoarding Card 3' },
    { id: 'card4', icon: OnBoardingCard4, title: 'OnBoarding Card 4' },
    { id: 'card5', icon: OnBoardingCard5, title: 'OnBoarding Card 5' },
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
        <section className="mx-auto flex h-[250px] max-w-full flex-col items-center space-y-6 sm:h-[260px] sm:max-w-[1000px] sm:space-y-8 sm:px-6 lg:h-[322px] lg:max-w-[1135px] lg:space-y-8 lg:px-8">
            {/* 캐러셀 박스 */}
            <div className="relative w-full">
                {/* 좌우 버튼 - 태블릿+에서만 표시 */}
                <button
                    onClick={scrollPrev}
                    disabled={isStart}
                    className="absolute top-1/2 -left-8 hidden -translate-y-1/2 p-2 sm:-left-10 sm:block lg:-left-10"
                >
                    {isStart ? <LeftInactiveArrowIcon /> : <LeftActiveArrowIcon />}
                </button>

                <button
                    onClick={scrollNext}
                    disabled={isEnd}
                    className="absolute top-1/2 -right-8 hidden -translate-y-1/2 p-2 sm:-right-10 sm:block lg:-right-10"
                >
                    {isEnd ? <RightInactiveArrowIcon /> : <RightActiveArrowIcon />}
                </button>

                {/* Embla 캐러셀 */}
                <div className="overflow-hidden rounded-[16px] sm:rounded-[20px] lg:rounded-[24px]" ref={emblaRef}>
                    <div className="scroll-snap-x scroll-snap-mandatory flex gap-6 sm:gap-6 lg:gap-7">
                        {cards.map((card) => {
                            const IconComponent = card.icon;

                            return (
                                <div
                                    key={card.id}
                                    className="scroll-snap-center flex h-[240px] w-full flex-shrink-0 flex-col rounded-[16px] sm:h-[260px] sm:w-auto sm:rounded-[20px] lg:h-[280px] lg:w-auto lg:rounded-[24px]"
                                >
                                    {/* ✅ 변경1: absolute 대신 Grid로 같은 셀에 SVG와 오버레이를 겹치기 */}
                                    <div className="grid h-full w-full overflow-hidden">
                                        {/* SVG 그대로 */}
                                        <IconComponent className="col-start-1 row-start-1 h-full w-full object-contain" />

                                        {/* ✅ 변경2: card0에서만 보이는 오버레이(텍스트/버튼). SVG 바깥으로 못 나가게 overflow-hidden 상태 */}
                                        {card.id === 'card0' && (
                                            <div className="p-x-5 pointer-events-none z-[1] col-start-1 row-start-1 flex h-full w-full items-end p-8 sm:pb-10 sm:pl-10 lg:pb-12">
                                                <div className="pointer-events-auto flex flex-wrap items-center gap-1 sm:gap-2 lg:gap-3">
                                                    {/* 문장 부분 */}
                                                    <p className="text-16px-medium sm:text-18px-medium lg:text-20px-medium flex flex-wrap items-center text-black">
                                                        <span className="text-main font-semibold">SNACK</span>
                                                        <span className="mr-1 font-medium">을 만든 </span>

                                                        <span className="text-main font-semibold">SNACKER</span>
                                                        <span className="font-medium">들을 소개합니다!</span>
                                                    </p>

                                                    {/* 버튼 */}
                                                    <a
                                                        href={SNACKER_NOTION_URL}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        className="bg-main text-14px-medium sm:text-16px-semibold focus-visible:ring-main/40 inline-flex h-8 items-center justify-center rounded-xl px-3 text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-transform duration-150 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-[1px] sm:ml-3 sm:h-9 sm:px-4 lg:h-10 lg:px-5"
                                                    >
                                                        보러가기 &gt;
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
                            i === selectedIndex ? 'w-4 bg-black' : 'bg-black-30'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
