import { useQuery } from '@tanstack/react-query';

import { getArticleTerms } from '@/pages/article/apis/getArticleTerms';
import type { GlossaryItem } from '@/pages/article/types/accordionTypes';

export const useArticleTerms = (articleId: number) => {
    return useQuery<GlossaryItem[]>({
        queryKey: ['articleTerms', articleId],
        queryFn: () => getArticleTerms(articleId),
        enabled: !!articleId, // 0, NaN 방지
        staleTime: 5 * 60 * 1000, // 5분 캐시
    });
};
