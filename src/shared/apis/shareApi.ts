import axiosInstance from './axios';

export const createShareLink = async (articleId: number) => {
    const { data } = await axiosInstance.post(`/api/articles/${articleId}/share`, null);

    if (!data?.isSuccess) {
        throw new Error(data?.message ?? '공유 링크 생성 실패');
    }

    const uuid = data?.result?.uuid as string | undefined;
    const apiUrl = data?.result?.sharedUrl as string | undefined;

    if (!uuid || !apiUrl) {
        throw new Error('공유 URL 생성에 실패했습니다.');
    }

    const url = apiUrl;

    return { uuid, url };
};
