export const API_CATEGORIES = ['정치', '경제', '사회', '생활/문화', '세계', 'IT/과학', '기타'] as const;
export type ApiCategory = (typeof API_CATEGORIES)[number];

export type ArticleCardCategory = '정치' | '금융' | '사회' | '세계' | '과학' | '문화' | '기타';

export const CATEGORY_MAP: Record<ApiCategory, ArticleCardCategory> = {
    정치: '정치',
    경제: '금융',
    사회: '사회',
    '생활/문화': '문화',
    세계: '세계',
    'IT/과학': '과학',
    기타: '기타',
} as const;

export const mapApiCategoryToCardCategory = (apiCategory: string): ArticleCardCategory =>
    (CATEGORY_MAP as Record<string, ArticleCardCategory>)[apiCategory] ?? '기타';

export const DEFAULT_SELECTED_CATEGORIES = ['정치'] as const;

export const CATEGORY_CODE_TO_KO: Record<string, ApiCategory> = {
    '100': '정치',
    '101': '경제',
    '102': '사회',
    '103': '생활/문화',
    '104': '세계',
    '105': 'IT/과학',
    '000': '기타',
} as const;

export const CATEGORY_KO_TO_CODE: Record<ApiCategory, string> = {
    정치: '100',
    경제: '101',
    사회: '102',
    '생활/문화': '103',
    세계: '104',
    'IT/과학': '105',
    기타: '000',
} as const;
