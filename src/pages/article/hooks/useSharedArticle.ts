import { useQuery } from '@tanstack/react-query';

import { getSharedArticle } from '@/pages/article/apis/getSharedArticle';
import type { SharedArticle } from '@/pages/article/types/share';

export const useSharedArticle = (uuid: string) =>
    useQuery<SharedArticle>({
        queryKey: ['shared-article', uuid],
        queryFn: () => getSharedArticle(uuid),
        enabled: !!uuid,
        staleTime: 5 * 60 * 1000,
    });
