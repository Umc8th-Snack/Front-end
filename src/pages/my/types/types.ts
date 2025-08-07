export type Memo = {
    id: number;
    date: string;
    content: string;
};

export type Scrap = {
    id: number;
    title: string;
    summary: string;
};

export interface UserProfile {
    userId: number;
    email: string;
    nickname: string;
    profileUrl: string;
    introduction: string;
}
