/**
 * 카테고리 관련 상수 정의
 */

// API에서 사용하는 카테고리 목록
export const API_CATEGORIES = ['정치', '경제', '사회', '국제', '스포츠', '연예', 'IT/과학'] as const;

// ArticleCard 컴포넌트에서 사용하는 카테고리 타입
export type ArticleCardCategory = '정치' | '금융' | '사회' | '세계' | '과학' | '문화' | '기타';

// API 카테고리를 ArticleCard 카테고리로 매핑
export const CATEGORY_MAP = {
    정치: '정치',
    경제: '금융',
    사회: '사회',
    국제: '세계',
    'IT/과학': '과학',
    스포츠: '문화',
    연예: '문화',
} as const;

// 카테고리 변환 함수
export const mapApiCategoryToCardCategory = (apiCategory: string): ArticleCardCategory => {
    return CATEGORY_MAP[apiCategory as keyof typeof CATEGORY_MAP] || '기타';
};

// 기본 선택 카테고리
export const DEFAULT_SELECTED_CATEGORIES = ['정치'] as const;
