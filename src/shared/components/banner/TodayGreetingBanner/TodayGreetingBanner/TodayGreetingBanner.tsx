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
        enabled: needProfile, // ⭐ 첫 진입에 불필요한 호출 방지
        staleTime: 5 * 60 * 1000,
    });

    // 닉네임 결정: 쿼리 캐시 -> AuthContext -> props(home)
    const cachedNickname = me?.nickname ?? user?.nickname ?? '';
    // ❗ 빈 문자열('')일 때도 캐시로 폴백되도록 || 사용(??는 ''을 유효값으로 봄)
    const effectiveNickname = variant === 'custom-feed' ? cachedNickname : nickname || cachedNickname;

    // 닉네임이 실제 존재할 때만 문구 노출
    const hasNickname = Boolean(effectiveNickname);

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
                                hasNickname
                                    ? 'h-[14px] w-[14px] sm:h-[15px] sm:w-[15px] lg:h-[16.67px] lg:w-[16.67px]'
                                    : 'h-[28px] w-[28px] sm:h-[32px] sm:w-[32px] lg:h-[40px] lg:w-[40px]'
                            }
                        />
                        <p
                            className={
                                hasNickname
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
                            {variant === 'home' ? (
                                // 메인피드: “맞춤 뉴스” 문구 (반응형은 표시 방식만 다르게)
                                <>
                                    <span className="break-keep whitespace-normal sm:hidden">
                                        {effectiveNickname}님의 맞춤 뉴스를 확인해 보세요.
                                    </span>
                                    <span className="hidden sm:block">
                                        <span className="break-keep whitespace-normal">
                                            {effectiveNickname}님의 맞춤 뉴스를 확인해 보세요.
                                        </span>
                                    </span>
                                </>
                            ) : (
                                // 맞춤피드: “맞춤 피드” 문구
                                <>
                                    <span className="break-keep whitespace-normal sm:hidden">
                                        {effectiveNickname}님을 위한 맞춤 피드를 보여드려요.
                                    </span>
                                    <span className="hidden sm:block">
                                        <span className="break-keep whitespace-normal">
                                            {effectiveNickname}님을 위한 맞춤 피드를 보여드려요.
                                        </span>
                                    </span>
                                </>
                            )}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayGreetingBanner;
