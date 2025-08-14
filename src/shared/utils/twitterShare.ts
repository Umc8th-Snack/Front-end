export const handleTwitterShare = (shareUrl: string, text?: string) => {
    const tweetText = encodeURIComponent(text || '');
    const url = encodeURIComponent(shareUrl);
    const twitterShareUrl = `https://x.com/intent/tweet?text=${tweetText}&url=${url}`;

    window.open(twitterShareUrl, '_blank', 'width=550,height=420');
};
