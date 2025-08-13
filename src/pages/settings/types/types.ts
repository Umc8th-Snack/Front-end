export type ApiEnvelope<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
    error?: Record<string, unknown>;
};

// 이메일 변경
export interface ChangeEmailPayload {
    newEmail: string;
    currentPassword: string;
}
export interface ChangeEmailResult {
    email: string;
    updatedAt: string;
}

// 비밀번호 변경
export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// 회원 탈퇴
export interface WithdrawPayload {
    password: string;
}
