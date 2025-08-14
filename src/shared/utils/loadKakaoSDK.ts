export const loadKakaoSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.getElementById('kakao-sdk')) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.id = 'kakao-sdk';
        script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Kakao SDK load failed'));
        document.body.appendChild(script);
    });
};
