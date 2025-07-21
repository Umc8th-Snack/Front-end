//테스트를 위해 임시로 만든 데이터입니다!
import type { GlossaryItem, QuizItem } from '../../types/accordionTypes';

// 용어집 테스트 데이터
export const glossaryTestData: GlossaryItem[] = [
    {
        word: '안녕',
        definition: '한국말로 인사 >_<',
    },
    {
        word: '펭귄',
        definition: '귀여워요',
    },
    {
        word: '마라탕',
        definition: '배고파요',
    },
    {
        word: '과자',
        definition: '맛있당',
    },
    {
        word: '스낵',
        definition: '화이팅🍀',
    },
];

export const quizData: QuizItem[] = [
    {
        question: '이번 프로젝트의 서비스 명은?',
        options: ['스넉', '스낵', '스낵면', '스웩'],
        answer: 0,
    },
    {
        question: '지금은 무슨 계절인가요?',
        options: ['봄', '여름', '가을', '겨울'],
        answer: 0,
    },
];
