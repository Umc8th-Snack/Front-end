import axios from 'axios';

export const createShareLink = async (articleId: number) => {
    const response = await axios.post(`/api/articles/${articleId}/share`);
    return response.data.result.sharedUrl;
};
