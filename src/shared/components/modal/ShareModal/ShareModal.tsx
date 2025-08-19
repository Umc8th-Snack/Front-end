import { useEffect, useRef, useState } from 'react';

import { createShareLink } from '@/shared/apis/shareApi';
import XIcon from '@/shared/assets/icons/close-x.svg?react';
import GmailIcon from '@/shared/assets/icons/logo-gmail.svg?react';
import KakaoIcon from '@/shared/assets/icons/logo-kakao.svg?react';
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

type ShareStatus = 'loading' | 'ready' | 'forbidden' | 'error';

const ShareModal = ({ articleId, title, description, image, onClose }: ShareModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [sharedUrl, setSharedUrl] = useState<string>('');
    const [showToast, setShowToast] = useState(false);
    const [status, setStatus] = useState<ShareStatus>('loading');
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        let cancelled = false;

        const fetchShareUrl = async () => {
            setStatus('loading');
            setSharedUrl('');
            setErrorMsg('');

            try {
                const { url } = await createShareLink(articleId); // ← 이 함수가 {url} 객체를 반환하도록 맞추기
                if (!cancelled) {
                    setSharedUrl(url);
                    setStatus('ready');
                }
            } catch (e: any) {
                if (cancelled) return;
                const code = e?.response?.data?.code;
                const message = e?.response?.data?.message || '공유 링크 생성에 실패했습니다.';
                if (code === 'SHARE_6602') {
                    setStatus('forbidden');
                    setErrorMsg('이 기사는 정책상 공유할 수 없어요.');
                } else {
                    setStatus('error');
                    setErrorMsg(message);
                }
            }
        };

        void fetchShareUrl();
        return () => {
            cancelled = true;
        };
    }, [articleId]);

    const handleCopyLink = async () => {
        if (!sharedUrl || status !== 'ready') return;
        await navigator.clipboard.writeText(sharedUrl);
        setShowToast(true);
    };

    const guardShare = (action: () => void | Promise<void>) => {
        if (!sharedUrl) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 1600);
            return;
        }

        void action();
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
                    aria-label="닫기"
                >
                    <XIcon />
                </button>

                <div className="text-36px-semibold mt-[24px] mb-[36px] text-center">공유하기</div>

                {/* 상태 메시지 */}
                <div className="absolute top-[120px] flex items-center">
                    {status === 'loading' && <div className="text-black-70">링크를 생성 중입니다...</div>}
                    {status === 'forbidden' && (
                        <div className="text-danger/90">{errorMsg || '공유할 수 없는 기사입니다.'}</div>
                    )}
                    {status === 'error' && (
                        <div className="text-danger/90">{errorMsg || '공유 링크 생성 중 오류가 발생했습니다.'}</div>
                    )}
                </div>

                {/* 공유 아이콘 */}
                <div className="mb-[20px] flex w-[401px] justify-between opacity-100">
                    <CircleShareButton
                        icon={<KakaoIcon width={44} height={44} />}
                        label="카카오톡"
                        bgColor="bg-kakao-yellow"
                        textColor="text-black-70"
                        onClick={() =>
                            guardShare(() => {
                                void handleKakaoShare(sharedUrl, title, description, image);
                            })
                        }
                    />
                    <CircleShareButton
                        icon={<TwitterIcon width={40} height={41} />}
                        label="X"
                        bgColor="bg-black"
                        onClick={() => guardShare(() => handleTwitterShare(sharedUrl, title))}
                    />
                    <CircleShareButton
                        icon={<GmailIcon width={60} height={60} />}
                        label="Gmail"
                        filled={false}
                        borderColor="border-black-50"
                        textColor="text-black-70"
                        onClick={() => guardShare(() => handleGmailShare(sharedUrl, title, description))}
                    />
                </div>

                {/* 링크 복사 */}
                <div className="mb-[8px] flex w-full max-w-[456px] flex-col items-center gap-[20px]">
                    <CopyLinkBox
                        onCopy={() => void handleCopyLink()}
                        link={
                            status === 'ready' && sharedUrl
                                ? sharedUrl
                                : status === 'forbidden'
                                  ? '공유 불가 기사'
                                  : '링크 생성 중...'
                        }
                    />
                </div>
            </div>

            {showToast && (
                <ShareToast
                    message={
                        status === 'ready'
                            ? '링크가 복사되었어요!'
                            : status === 'loading'
                              ? '링크 생성 중입니다.'
                              : '이 기사는 공유할 수 없어요.'
                    }
                    onDone={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default ShareModal;
