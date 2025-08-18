import { useMemo } from 'react';

export const useKoreanDateFormatter = () =>
    useMemo(
        () =>
            new Intl.DateTimeFormat('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        []
    );
