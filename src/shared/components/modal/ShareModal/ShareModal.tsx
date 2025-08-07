import { useRef, useState } from 'react';

import { createShareLink } from '@/shared/apis/shareApi';
import XIcon from '@/shared/assets/icons/close-x.svg?react';
import KakaoIcon from '@/shared/assets/icons/logo-kakao.svg?react';
import NaverMailIcon from '@/shared/assets/icons/logo-naver-mail.svg?react';
import TwitterIcon from '@/shared/assets/icons/logo-x.svg?react';
import { handleGmailShare } from '@/shared/utils/gmailShare';
import { handleKakaoShare } from '@/shared/utils/kakaoShare';
import { handleTwitterShare } from '@/shared/utils/twitterShare';

import CircleShareButton from './CircleShareButton';
import CopyLinkBox from './CopyLinkBox';
import ShareToast from './ShareToast';

interface ShareModalProps {
    articleId: number;
    title: string;
    description: string;
    image: string;
    onClose: () => void;
}

const ShareModal = ({ articleId, title, description, image, onClose }: ShareModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [sharedUrl, setSharedUrl] = useState<string>('');
    const [showToast, setShowToast] = useState(false);

    const fetchShareUrl = async () => {
        try {
            const url = await createShareLink(articleId);
            setSharedUrl(url);
            return url;
        } catch (error) {
            console.error('공유 링크 생성 실패:', error);
            alert('링크 생성에 실패했습니다.');
            return '';
        }
    };

    const handleCopyLink = async () => {
        const url = sharedUrl || (await fetchShareUrl());
        if (url) {
            await navigator.clipboard.writeText(url);
            setShowToast(true);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-10"
            onClick={(e) => {
                if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
            }}
        >
            <div
                ref={modalRef}
                className="relative flex w-[600px] flex-col items-center rounded-[10px] bg-white px-[40px] py-[40px]"
            >
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-[12px] right-[8px] flex h-[35px] w-[35px] cursor-pointer items-center justify-center"
                    onClick={onClose}
                >
                    <XIcon />
                </button>

                <div className="text-36px-semibold mt-[24px] mb-[36px] text-center">공유하기</div>

                {/* 공유 아이콘 */}
                <div className="mb-[20px] flex w-[401px] justify-between">
                    <CircleShareButton
                        icon={<KakaoIcon width={44} height={44} />}
                        label="카카오톡"
                        bgColor="bg-kakao-yellow"
                        textColor="text-black-70"
                        onClick={() =>
                            void (async () => {
                                const url = sharedUrl || (await fetchShareUrl());
                                if (url) void handleKakaoShare(url, title, description, image);
                            })()
                        }
                    />
                    <CircleShareButton
                        icon={<TwitterIcon width={40} height={41} />}
                        label="X"
                        bgColor="bg-black"
                        onClick={() =>
                            void (async () => {
                                const url = sharedUrl || (await fetchShareUrl());
                                if (url) void handleTwitterShare(url, title);
                            })()
                        }
                    />
                    <CircleShareButton
                        icon={<NaverMailIcon width={60} height={60} />}
                        label="네이버 메일"
                        filled={false}
                        borderColor="border-naver-green"
                        textColor="text-black-70"
                        onClick={() =>
                            void (async () => {
                                const url = sharedUrl || (await fetchShareUrl());
                                if (url) void handleGmailShare(url, title, description);
                            })()
                        }
                    />
                </div>

                {/* 링크 복사 */}
                <div className="mb-[20px] flex w-full max-w-[456px] flex-col items-center gap-[20px]">
                    <CopyLinkBox onCopy={() => void handleCopyLink()} link={sharedUrl || '링크 생성 중...'} />
                </div>

                {showToast && <ShareToast message="링크가 복사되었습니다." onDone={() => setShowToast(false)} />}
            </div>
        </div>
    );
};

export default ShareModal;
