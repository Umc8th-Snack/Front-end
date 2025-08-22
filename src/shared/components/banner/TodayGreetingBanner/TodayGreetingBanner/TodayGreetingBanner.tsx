import { useQuery } from '@tanstack/react-query';

import { MY_QUERY_KEYS } from '@/pages/my/constants/queryConstants';
import { userApi } from '@/shared/apis/user';
import CalendarIcon from '@/shared/assets/calendar-icon.svg?react';
import SpringDots from '@/shared/assets/spring-dots.svg?react';
import { useAuth } from '@/shared/context/AuthContext';

interface TodayGreetingBannerProps {
    nickname?: string; // (home 전용 prop로 남겨도 됨)
    variant?: 'home' | 'custom-feed';
}

const TodayGreetingBanner = ({ nickname, variant = 'home' }: TodayGreetingBannerProps) => {
    const today = new Date();

    const { data: me } = useQuery({
        queryKey: MY_QUERY_KEYS.USER_PROFILE,
        queryFn: userApi.getMyInfo,
        // 캐시 구독만 목적이면 staleTime을 길게 줘도 OK
        staleTime: 5 * 60 * 1000,
    });

    const { user } = useAuth();

    // 닉네임 결정 로직: 캐시 우선 -> AuthContext -> props
    const cachedNickname = me?.nickname ?? user?.nickname ?? '';
    const effectiveNickname = variant === 'custom-feed' ? cachedNickname : (nickname ?? cachedNickname);

    const hasNickname = variant === 'custom-feed' ? true : Boolean(effectiveNickname);

    const formattedWithWeekday = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
    const formattedWithoutWeekday = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const heightClass = variant === 'custom-feed' ? 'h-[130px] sm:h-[110px]' : 'h-[90px] sm:h-[110px]';

    return (
        <div className="flex w-full items-center justify-center">
            <div
                className={`border-black-30 relative flex ${heightClass} w-full max-w-[1121px] items-center gap-6 rounded-2xl border bg-white px-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.25)]`}
            >
                <div className="absolute top-1/2 -left-[8px] -translate-y-1/2">
                    <SpringDots className="h-[82px] w-[28.5px]" />
                </div>

                <div className="flex flex-col justify-center p-6">
                    <div className="flex items-center gap-[10px]">
                        <CalendarIcon
                            className={
                                effectiveNickname
                                    ? 'h-[14px] w-[14px] sm:h-[15px] sm:w-[15px] lg:h-[16.67px] lg:w-[16.67px]'
                                    : 'h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[40px] lg:w-[40px]'
                            }
                        />
                        <p
                            className={
                                effectiveNickname
                                    ? 'text-16px-medium sm:text-18px-medium lg:text-16px-medium'
                                    : 'text-16px-medium sm:text-18px-medium lg:text-20px-medium'
                            }
                        >
                            {variant === 'home' ? (
                                <>
                                    <span>오늘은 </span>
                                    <span className="sm:hidden">{formattedWithoutWeekday}이에요.</span>
                                    <span className="hidden sm:inline">{formattedWithWeekday}이에요.</span>
                                </>
                            ) : (
                                <>
                                    <span>오늘은 </span>
                                    <span>{formattedWithoutWeekday}이에요.</span>
                                </>
                            )}
                        </p>
                    </div>

                    {hasNickname && (
                        <p className="text-18px-semibold sm:text-20px-semibold lg:text-24px-semibold mt-[6px] text-black">
                            <span className="break-keep whitespace-normal sm:hidden">
                                {effectiveNickname}님의 맞춤 뉴스를 확인해 보세요.
                            </span>
                            <span className="hidden sm:block">
                                <span className="break-keep whitespace-normal">{effectiveNickname}님을 위한 </span>
                                <span className="break-keep whitespace-normal">오늘의 맞춤 피드를 보여드려요.</span>
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayGreetingBanner;
