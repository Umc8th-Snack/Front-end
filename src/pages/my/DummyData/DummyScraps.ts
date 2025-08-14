const dummyScraps = Array.from({ length: 63 }, (_, i) => ({
    id: i + 1,
    title: `스크랩한 기사 제목 ${i + 1}`,
    summary: `이것은 ${i + 1}번째 스크랩한 기사의 요약 내용입니다. 테스트용 더미 데이터입니다.`,
}));

export default dummyScraps;
