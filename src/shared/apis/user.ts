import api from './api';
/**
 * 사용자 정보 응답 타입
 */
export interface UserInfoResponse {
    userId: number;
    email: string;
    nickname: string;
    profileImage?: string;
    introduction?: string;
}

/**
 * 사용자 관련 API
 */
export const userApi = {
    /**
     * 현재 로그인한 사용자 정보 조회
     * - Access Token 필요 (Authorization 헤더)
     * - 마이페이지 정보 반환
     */
    getMyInfo: async (): Promise<UserInfoResponse> => {
        console.log('👤 [USER API] 내 정보 조회 요청');
        const response = await api.get<UserInfoResponse>('/api/users/me');
        console.log('✅ [USER API] 내 정보 조회 성공:', response);
        return response;
    },

    /**
     * 사용자 정보 수정
     * - 닉네임, 프로필 이미지, 소개 등 수정 가능
     */
    updateMyInfo: async (data: Partial<UserInfoResponse>): Promise<UserInfoResponse> => {
        console.log('✏️ [USER API] 내 정보 수정 요청:', data);
        const response = await api.patch<UserInfoResponse>('/api/users/me', data);
        console.log('✅ [USER API] 내 정보 수정 성공:', response);
        return response;
    },

    /**
     * 비밀번호 변경
     */
    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }): Promise<void> => {
        console.log('🔐 [USER API] 비밀번호 변경 요청');
        await api.patch('/api/users/me/password', data);
        console.log('✅ [USER API] 비밀번호 변경 성공');
    },

    /**
     * 회원 탈퇴
     */
    withdraw: async (password: string): Promise<void> => {
        console.log('🚪 [USER API] 회원 탈퇴 요청');
        await api.post('/api/users/me/withdraw', { password });
        console.log('✅ [USER API] 회원 탈퇴 완료');
    },

    /**
     *이메일 변경
     */
    changeEmail: async (data: { newEmail: string; currentPassword: string }): Promise<void> => {
        console.log('✉️ [USER API] 이메일 변경 요청:', data);
        await api.patch('/api/users/me/email', data); // Content-Type: application/json
        console.log('✅ [USER API] 이메일 변경 성공');
    },
};
