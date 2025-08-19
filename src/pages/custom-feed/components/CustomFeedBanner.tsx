import CookieIcon from '@/shared/assets/icons/cookie-bubble.svg?react';
import SpringDots from '@/shared/assets/spring-dots.svg?react';
import { useAuth } from '@/shared/context/AuthContext';

const CustomFeedBanner = () => {
    const { user } = useAuth();
    const nickname = user?.nickname;

    return (
        <div className="flex w-full items-center justify-center">
            <div className="border-black-30 relative flex h-[110px] w-full max-w-[1121px] items-center justify-center rounded-2xl border bg-white px-4 text-center shadow-[0_4px_10px_rgba(0,0,0,0.25)] sm:h-[120px] sm:px-6 lg:h-[140px] lg:px-10">
                <div className="absolute top-1/2 -left-[8px] -translate-y-1/2">
                    <SpringDots className="h-[82px] w-[28.5px]" />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-20px-semibold sm:text-24px-semibold lg:text-32px-semibold relative flex items-center justify-center leading-[1.3] text-black">
                        <span className="relative inline-block">
                            <span className="relative z-10">맞춤 피드 시작하기</span>
                            <CookieIcon
                                className="pointer-events-none absolute -top-[0.2em] left-[0em] z-0 h-[2em] w-[2em] -translate-x-[1em]"
                                aria-hidden
                            />
                        </span>
                    </h3>

                    <p className="text-14px-medium sm:text-20px-medium lg:text-24px-medium relative z-10 mt-2 text-center sm:mt-1.5 lg:mt-4">
                        {nickname}님 전용 맞춤 피드,&nbsp;
                        <br className="block sm:hidden" />
                        메인 피드 탐색으로 시작해 보세요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomFeedBanner;
