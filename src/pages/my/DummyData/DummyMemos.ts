const dummyMemos = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    content: `메모 내용 ${i + 1}입니다. 이는 테스트용 더미 데이터입니다.`,
}));

export default dummyMemos;
