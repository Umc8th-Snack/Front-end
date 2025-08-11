// 퀴즈 결과 메시지 상수
export const QUIZ_MESSAGES = {
    CORRECT: '맞았습니다!',
    INCORRECT: '틀렸습니다!',
} as const;

// 스크롤 관련 설정 상수
export const SCROLL_CONFIG = {
    THRESHOLD: 50,
    MAX_HEIGHT: 'max-h-140',
} as const;

// 퀴즈 UI 스타일링 상수
export const QUIZ_UI = {
    GAP: 'gap-4',
    BORDER_BOTTOM: 'border-b border-gray-300',
    QUESTION_MARGIN: 'mb-10',
    ANSWER_MARGIN: 'mb-4',
    EXPLANATION_MARGIN: 'mb-1',
} as const;
