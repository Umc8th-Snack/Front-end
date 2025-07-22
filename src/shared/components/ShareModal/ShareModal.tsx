import React, { useRef, useState } from 'react';

import KakaoIcon from '@/shared/assets/icons/logo-kakao.svg?react';
import NaverIcon from '@/shared/assets/icons/logo-naver-mail.svg?react';
// TODO: 닫기 버튼 SVGR로 변경 이후 TwitterIcon의 네이밍 변경 필요
import TwitterIcon from '@/shared/assets/icons/logo-x.svg?react';

import CircleShareButton from './CircleShareButton';
import CopyLinkBox from './CopyLinkBox';
import ShareToast from './ShareToast';

// TODO: SVGR 컴포넌트로 변환
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width={35} height={35} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
);

// TODO: 리펙토링 필요
// 현재는 모달 내부에서 직접 닫기 버튼을 구현하고 있지만, 별도의 컴포넌트로 분리하는 것이 좋을 것 같습니다.
function ShareModal({ onClose }: { onClose: () => void }) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText('https://snack.news/article/123');
            setShowToast(true);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-10"
            role="presentation"
            onClick={(e) => {
                if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                    onClose();
                }
            }}
        >
            <div
                ref={modalRef}
                className="relative flex w-[600px] flex-col items-center rounded-[8px] bg-white px-[40px] py-[40px]"
            >
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[25px] right-[25px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon className="h-[37.5px] w-[37.5px]" />
                </button>

                {/* 타이틀 */}
                <div className="text-36px-semibold mt-[30px] mb-[32px] h-[54px] text-center leading-[54px] text-black">
                    공유하기
                </div>

                {/* 공유 아이콘 그룹 */}
                <div className="mb-[20px] flex w-[401px] justify-between">
                    <CircleShareButton
                        icon={<KakaoIcon width={44} height={44} />}
                        label="카카오톡"
                        bgColor="bg-kakao-yellow"
                        textColor="text-black-70"
                    />

                    <CircleShareButton icon={<TwitterIcon width={40} height={41} />} label="X" bgColor="bg-black" />

                    <CircleShareButton
                        icon={<NaverIcon width={60} height={60} />}
                        label="네이버 메일"
                        filled={false}
                        borderColor="border-naver-green"
                        textColor="text-black-70"
                    />
                </div>

                {/* 링크 복사 박스 */}
                <div className="mb-[20px] flex w-full max-w-[456px] flex-col items-center gap-[20px]">
                    <CopyLinkBox onCopy={() => void handleCopy()} link="https://snack.news/article/123" />
                </div>

                {/* 토스트 */}
                {showToast && <ShareToast message="링크가 복사되었습니다." onDone={() => setShowToast(false)} />}
            </div>
        </div>
    );
}

export default ShareModal;

// TODO: 테스트용 더미 컴포넌트, 실제 사용 시 삭제
export const DummyShareModal = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    if (!isOpen) return null;

    return <ShareModal onClose={handleClose} />;
};
