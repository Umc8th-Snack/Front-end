export interface Question {
    id: number;
    question: string;
    answer: string;
    isCorrect: boolean;
    explanation: string;
}

export interface QuizCommentaryData {
    questions: Question[];
}

// 더미데이터
export const quizCommentaryDummyData: QuizCommentaryData = {
    questions: [
        {
            id: 1,
            question: '이 기사의 주요 주제는 무엇인가요?',
            answer: '사회적 이슈에 대한 심층 분석',
            isCorrect: true,
            explanation:
                '기사는 사회적 이슈를 다루고 있으며, 이를 심층적으로 분석하고 있습니다. 제목과 내용을 종합해보면 이 주제가 맞습니다.',
        },
        {
            id: 2,
            question: '기사에서 언급된 가장 중요한 포인트는?',
            answer: '정책 변화의 영향',
            isCorrect: false,
            explanation:
                '기사에서는 정책 변화보다는 사회적 현상과 그 원인에 대해 더 자세히 다루고 있습니다. 답을 다시 한번 확인해보세요.',
        },
        {
            id: 3,
            question: '이 기사의 결론은 무엇인가요?',
            answer: '지속적인 모니터링이 필요하다',
            isCorrect: true,
            explanation: '기사 마지막 부분에서 이 상황에 대한 지속적인 모니터링과 대응이 필요하다고 강조하고 있습니다.',
        },
        {
            id: 4,
            question: '기사에서 제시된 해결책은?',
            answer: '다각적 접근이 필요하다',
            isCorrect: true,
            explanation: '기사에서는 단순한 해결책보다는 여러 측면에서의 다각적 접근이 필요하다고 제시하고 있습니다.',
        },
        {
            id: 5,
            question: '이 기사의 시사점은?',
            answer: '사회 변화의 흐름을 이해하는 것이 중요하다',
            isCorrect: true,
            explanation:
                '기사는 현재의 사회적 변화를 이해하고 그 흐름을 파악하는 것이 미래를 준비하는 데 중요하다는 점을 시사하고 있습니다.',
        },
    ],
};
