export const CATEGORY_CODE_TO_NAME = {
    '100': '정치',
    '101': '경제',
    '102': '사회',
    '103': '생활/문화',
    '104': '세계',
    '105': 'IT/과학',
    '000': '기타',
} as const;

export type CategoryCode = keyof typeof CATEGORY_CODE_TO_NAME;
export type CategoryName = (typeof CATEGORY_CODE_TO_NAME)[CategoryCode];

const safeHas = (obj: object, key: PropertyKey): boolean => Object.prototype.hasOwnProperty.call(obj, key);

export const getCategoryName = (codeOrName: string): string => {
    if (safeHas(CATEGORY_CODE_TO_NAME, codeOrName)) {
        return CATEGORY_CODE_TO_NAME[codeOrName as CategoryCode];
    }
    return codeOrName;
};

export const API_FILTERABLE_CATEGORIES: CategoryName[] = [
    '정치',
    '경제',
    '사회',
    '생활/문화',
    '세계',
    'IT/과학',
    '기타',
];
