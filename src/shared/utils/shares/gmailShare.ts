export const handleGmailShare = (shareUrl: string, title: string, description?: string) => {
    const subject = encodeURIComponent(`[스낵] ${title}`);
    const body = encodeURIComponent(`${description || ''}\n\n기사 보기: ${shareUrl}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}
`;

    window.open(gmailUrl, '_blank');
};
