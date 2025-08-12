const dummyMemos = Array.from({ length: 40 }, (_, i) => ({
    memoId: i + 1,
    id: i + 1, // 기존 호환성
    content: `메모 내용 ${i + 1}`,
    createdAt: `2025-07-${i + 1 < 10 ? '0' + (i + 1) : i + 1}T00:00:00.000Z`,
    date: `2025.07.${i + 1 < 10 ? '0' + (i + 1) : i + 1}`, // 기존 호환성
    articleId: Math.floor(Math.random() * 10) + 1, // 랜덤 기사 ID
}));

export default dummyMemos;
