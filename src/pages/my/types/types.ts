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

//마이페이지 정보 조회
export interface UserProfile {
    userId: number;
    email: string;
    nickname: string;
    profileUrl: string;
    introduction: string;
}
