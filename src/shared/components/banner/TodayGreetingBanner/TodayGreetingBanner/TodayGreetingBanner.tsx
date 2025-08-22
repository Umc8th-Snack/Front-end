import { useQuery } from '@tanstack/react-query';

import { MY_QUERY_KEYS } from '@/pages/my/constants/queryConstants';
import { userApi } from '@/shared/apis/user';
import CalendarIcon from '@/shared/assets/calendar-icon.svg?react';
import SpringDots from '@/shared/assets/spring-dots.svg?react';
import { useAuth } from '@/shared/context/AuthContext';

interface TodayGreetingBannerProps {
    /** 홈 전용 prop 로 남겨도 됨 */
    nickname?: string;
    /** 메인피드('home') | 맞춤피드('custom-feed') */
    variant?: 'home' | 'custom-feed';
}

const TodayGreetingBanner = ({ nickname, variant = 'home' }: TodayGreetingBannerProps) => {
    const today = new Date();

    // ✅ Auth 상태에서만 쿼리 실행 여부를 결정
    const { user, isAuthenticated, loading } = useAuth();

    // ✅ “프로필 조회가 정말 필요한가?”를 먼저 결정
    // - custom-feed: 항상 필요 (닉네임 표시)
    // - home: props.nickname 준비 전(undefined)일 때만 필요
    const nicknameReady = nickname !== undefined; // ''(빈문자)도 "준비됨"으로 취급
    const needProfile = (variant === 'custom-feed' || !nicknameReady) && isAuthenticated && !loading;

    const { data: me } = useQuery({
        queryKey: MY_QUERY_KEYS.USER_PROFILE,
        queryFn: userApi.getMyInfo, // GET /api/users/me
        enabled: needProfile,
        staleTime: 5 * 60 * 1000,
    });

    // 닉네임 결정: 쿼리 캐시 -> AuthContext -> props(home)
    const cachedNickname = me?.nickname ?? user?.nickname ?? '';
    // ❗ 빈 문자열('')일 때도 캐시로 폴백되도록 || 사용(??는 ''을 유효값으로 봄)
    const effectiveNickname = variant === 'custom-feed' ? cachedNickname : nickname || cachedNickname;

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

    const heightClass = variant === 'custom-feed' ? 'h-[120px] sm:h-[110px]' : 'h-[90px] sm:h-[110px]';

    return (
        <div className="flex w-full items-center justify-center">
            <div
                className={`border-black-30 relative flex ${heightClass} w-full max-w-[1121px] items-center gap-6 rounded-2xl border bg-white px-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.25)]`}
            >
                {/* 스프링 장식 */}
                <div className="absolute top-1/2 -left-[8px] -translate-y-1/2">
                    <SpringDots className="h-[82px] w-[28.5px]" />
                </div>
                {/* 텍스트 */}
                <div className="flex flex-col justify-center p-9 sm:p-12">
                    {/* 캘린더 아이콘 + 날짜 */}
                    <div className="flex items-center">
                        <CalendarIcon
                            className={
                                variant === 'custom-feed'
                                    ? 'mr-2 h-4 w-4 sm:h-4 sm:w-4 lg:h-4.5 lg:w-4.5'
                                    : 'mr-4 h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
                            }
                        />

                        <p className="text-16px-semibold sm:text-18px-semibold lg:text-24px-semibold">
                            {variant === 'home' && (
                                <>
                                    <span>오늘은 </span>
                                    {/* 모바일에서는 요일 없는 날짜, sm 이상에서는 요일 포함 날짜 */}
                                    <span className="sm:hidden">{formattedWithoutWeekday}이에요.</span>
                                    <span className="hidden sm:inline">{formattedWithWeekday}이에요.</span>
                                </>
                            )}
                        </p>
                        <p className="text-14px-medium sm:text-18px-medium lg:text-20px-medium">
                            {variant === 'custom-feed' && (
                                <>
                                    <span>오늘은 </span>
                                    {/* 모바일에서는 요일 없는 날짜, sm 이상에서는 요일 포함 날짜 */}
                                    <span className="sm:hidden">{formattedWithoutWeekday}이에요.</span>
                                    <span className="hidden sm:inline">{formattedWithWeekday}이에요.</span>
                                </>
                            )}
                        </p>
                    </div>

                    {/* 맞춤 피드 안내 */}
                    {variant === 'custom-feed' && (
                        <p className="text-16px-semibold sm:text-20px-semibold lg:text-24px-semibold mt-[6px] text-black">
                            {/* 모바일 화면에서만 보이는 문구 */}
                            <span className="break-keep whitespace-normal sm:hidden">
                                {effectiveNickname}님의 맞춤 뉴스를 확인해 보세요.
                            </span>
                            {/* 태블릿 이상의 화면에서만 보이는 문구 */}

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
