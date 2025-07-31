const dummyScraps = Array.from({ length: 63 }, (_, i) => ({
    id: i + 1,
    title: `스크랩 기사 ${i + 1}`,
    summary: `스크랩 기사 ${i + 1}의 요악문 일부입니다...`,
}));

export default dummyScraps;
