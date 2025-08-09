const dummyMemos = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    date: `2025.07.${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
    content: `메모 내용 ${i + 1}`,
}));

export default dummyMemos;
