import { loadKakaoSDK } from '../loadKakaoSDK';

declare global {
    interface Window {
        Kakao: any;
    }
}

// 카카오 초기화
const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_SHARE_KEY);
    }
};

// 공유 함수
export const handleKakaoShare = async (shareUrl: string, title: string, description: string, imageUrl: string) => {
    try {
        await loadKakaoSDK();
        initKakao();

        if (!window.Kakao) {
            console.error('Kakao SDK not available');
            return;
        }

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title,
                description,
                imageUrl,
                link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
                },
            ],
        });
    } catch (error) {
        console.error('Kakao Share Error:', error);
    }
};
