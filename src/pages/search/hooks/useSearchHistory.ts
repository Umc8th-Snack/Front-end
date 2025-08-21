import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { addSearchHistory, getSearchHistory } from '../apis/searchHistoryApi';

export const useSearchHistory = (enabled: boolean) => {
    const qc = useQueryClient();
    const key = ['searchHistory'];

    const historyQuery = useQuery({
        queryKey: key,
        queryFn: getSearchHistory,
        enabled,
        staleTime: 60_000,
    });

    const addMutation = useMutation({
        mutationFn: (q: string) => addSearchHistory(q),
        onSuccess: (_v, q) => {
            qc.setQueryData<string[] | undefined>(key, (prev = []) => {
                const dedup = [q, ...prev.filter((x) => x !== q)];
                return dedup.slice(0, 10);
            });
        },
    });

    return {
        items: historyQuery.data ?? [],
        isLoading: historyQuery.isLoading,
        refetch: historyQuery.refetch,
        add: addMutation.mutate,
    };
};
