import CalendarIcon from '@/shared/assets/calendar-icon.svg?react';
import SpringDots from '@/shared/assets/spring-dots.svg?react';
import { useAuth } from '@/shared/context/AuthContext';

interface TodayGreetingBannerProps {
    nickname?: string;
    variant?: 'home' | 'custom-feed'; // 홈과 맞춤피드 구분
}

const TodayGreetingBanner = ({ nickname, variant = 'home' }: TodayGreetingBannerProps) => {
    const today = new Date();
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

    // AuthContext에서 사용자 정보 가져오기
    const { user } = useAuth();

    const effectiveNickname = variant === 'custom-feed' ? (user?.nickname ?? '') : (nickname ?? '');
    const hasNickname = variant === 'custom-feed' ? true : Boolean(effectiveNickname);

    // variant에 따른 높이 결정
    const heightClass =
        variant === 'custom-feed'
            ? 'h-[130px] sm:h-[110px]' // 맞춤피드: 높은 높이
            : 'h-[90px] sm:h-[110px]'; // 메인피드: 낮은 높이

    return (
        <div className="flex w-full items-center justify-center">
            <div
                className={`border-black-30 relative flex ${heightClass} w-full max-w-[1121px] items-center gap-6 rounded-2xl border bg-white px-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)]`}
            >
                {/* 스프링 장식 */}
                <div className="absolute top-1/2 -left-[8px] -translate-y-1/2">
                    <SpringDots className="h-[82px] w-[28.5px]" />
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col justify-center p-6">
                    {/* 캘린더 아이콘 + 날짜 */}
                    <div className="flex items-center gap-[10px]">
                        <CalendarIcon
                            className={
                                nickname
                                    ? 'h-[14px] w-[14px] sm:h-[15px] sm:w-[15px] lg:h-[16.67px] lg:w-[16.67px]'
                                    : 'h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[40px] lg:w-[40px]'
                            }
                        />
                        <p
                            className={
                                nickname
                                    ? 'text-14px-medium sm:text-15px-medium lg:text-16px-medium'
                                    : 'text-16px-medium sm:text-18px-medium lg:text-20px-medium'
                            }
                        >
                            {variant === 'home' ? (
                                <>
                                    <span>오늘은 </span>
                                    {/* 모바일에서는 요일 없는 날짜, sm 이상에서는 요일 포함 날짜 */}
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

                    {/* 맞춤 피드 안내 */}
                    {hasNickname && (
                        <p className="text-18px-semibold sm:text-20px-semibold lg:text-24px-semibold mt-[6px] break-keep whitespace-normal text-black">
                            <span className="block sm:inline">{effectiveNickname}님을 위한 </span>
                            <span className="block sm:inline">오늘의 맞춤 피드를 보여드려요.</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayGreetingBanner;
