import CalendarIcon from '@/shared/assets/icons/calendar-icon.svg?react';
import SpringDots from '@/shared/assets/icons/spring-dots.svg?react';

interface TodayGreetingBannerProps {
    nickname?: string;
}

const TodayGreetingBanner = ({ nickname }: TodayGreetingBannerProps) => {
    const today = new Date();
    const formatted = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    return (
        <div className="flex items-center">
            <div className="border-black-30 relative flex h-[110px] w-[1121px] items-center gap-6 rounded-2xl border bg-white px-4 shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                {/* 스프링 장식 */}
                <div className="absolute top-1/2 -left-[8px] -translate-y-1/2">
                    <SpringDots className="h-[82px] w-[28.5px]" />
                </div>

                {/* 텍스트 */}
                <div className="flex flex-col justify-center p-6">
                    {/* 캘린더 아이콘 + 날짜 */}
                    <div className="flex items-center gap-[10px]">
                        <CalendarIcon className={nickname ? 'h-[16.67px] w-[16.67px]' : 'h-[40px] w-[40px]'} />
                        <p className={nickname ? 'text-14px-medium leading-[17px]' : 'text-24px-medium leading-[36px]'}>
                            오늘은 {formatted}이에요.
                        </p>
                    </div>

                    {/* 맞춤 피드 안내 */}
                    {nickname && (
                        <p className="text-24px-semibold mt-[6px] leading-[36px] text-black">
                            {nickname}님을 위한 오늘의 맞춤 피드를 보여드려요.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayGreetingBanner;
