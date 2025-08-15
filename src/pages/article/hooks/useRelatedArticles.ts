// import { useQuery } from '@tanstack/react-query';

// import { getRelatedArticles } from '@/pages/article/apis/getRelatedArticles';
// import type { SharedArticle } from '@/pages/article/types/share';

// // 더미 데이터 (API 준비 전 테스트용)
// const dummyRelatedArticles: SharedArticle[] = [
//     {
//         articleId: 1,
//         title: 'AI 기술 발전으로 인한 일자리 변화 전망',
//         summary: '인공지능 기술의 발전이 다양한 산업 분야의 일자리 구조에 미치는 영향에 대한 분석',
//         publishedAt: '2025-01-27T00:00:00.000Z',
//         originalUrl: 'https://example.com/article1',
//         category: '기술',
//     },
//     {
//         articleId: 2,
//         title: '디지털 전환 시대의 교육 혁신',
//         summary: '코로나19 이후 가속화된 디지털 전환과 교육 분야의 혁신 사례',
//         publishedAt: '2025-01-26T00:00:00.000Z',
//         originalUrl: 'https://example.com/article2',
//         category: '교육',
//     },
//     {
//         articleId: 3,
//         title: '친환경 에너지 정책과 경제적 영향',
//         summary: '탄소중립 정책이 경제에 미치는 영향과 새로운 산업 기회',
//         publishedAt: '2025-01-25T00:00:00.000Z',
//         originalUrl: 'https://example.com/article3',
//         category: '경제',
//     },
// ];

// export const useRelatedArticles = (articleId: number) => {
//     return useQuery<SharedArticle[]>({
//         queryKey: ['relatedArticles', articleId],
//         queryFn: async () => {
//             try {
//                 // 실제 API 호출 시도
//                 return await getRelatedArticles(articleId);
//             } catch (error) {
//                 console.warn('관련 기사 API 호출 실패, 더미 데이터 사용:', error);
//                 // API 호출 실패 시 더미 데이터 반환
//                 return dummyRelatedArticles;
//             }
//         },
//         enabled: !!articleId,
//         staleTime: 5 * 60 * 1000, // 5분 캐시
//     });
// };

// src/pages/article/hooks/useRelatedArticles.ts
import { useQuery } from '@tanstack/react-query';

import { getRelatedArticles } from '@/pages/article/apis/getRelatedArticles';
import type { RelatedArticle, SharedArticle } from '@/pages/article/types/share';

// RelatedArticle → SharedArticle 매핑
const mapRelatedToShared = (a: RelatedArticle): SharedArticle => ({
    articleId: a.articleId,
    title: a.title,
    summary: '', // 원본에 없으므로 기본값
    publishedAt: '', // 원본에 없으므로 기본값
    originalUrl: '', // 원본에 없으므로 기본값
    category: 'related', // 구분용 기본값
});

// API 실패 대비: RelatedArticle 형태의 더미 (개발/백업용)
const dummyRelatedArticles: RelatedArticle[] = [
    { articleId: 101, title: '관련 기사 더미 1', imageUrl: '' },
    { articleId: 102, title: '관련 기사 더미 2', imageUrl: '' },
    { articleId: 103, title: '관련 기사 더미 3', imageUrl: '' },
];

export const useRelatedArticles = (articleId: number) => {
    return useQuery<RelatedArticle[], Error, SharedArticle[]>({
        queryKey: ['relatedArticles', articleId],
        queryFn: async () => {
            try {
                return await getRelatedArticles(articleId);
            } catch (e) {
                if (import.meta.env.DEV) {
                    console.warn('관련 기사 API 호출 실패, 더미 데이터 사용:', e);
                }
                return dummyRelatedArticles;
            }
        },
        // 원본 → UI 공통 타입으로 정규화 (소비측은 항상 SharedArticle[] 사용)
        select: (related) => related.map(mapRelatedToShared),
        enabled: Number.isFinite(articleId) && articleId > 0,
        staleTime: 5 * 60 * 1000,
    });
};
