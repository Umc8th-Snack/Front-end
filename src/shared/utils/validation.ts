/**
 * 비밀번호 유효성 검사
 * @param password 검증할 비밀번호
 * @returns 영문, 숫자 조합 8자 이상이면 true
 */
export const isPasswordValid = (password: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    return hasLetter && hasNumber && isLongEnough;
};

/**
 * 닉네임 유효성 검사
 * @param nickname 검증할 닉네임
 * @returns 에러 메시지 (유효하면 빈 문자열)
 */
export const validateNickname = (nickname: string): string => {
    const trimmed = nickname.trim();

    if (trimmed.length === 0) {
        return '';
    }

    if (trimmed.length < 2) {
        return '닉네임은 2자 이상 12자 이내로 입력해 주세요.';
    }

    if (trimmed.length > 12) {
        return '닉네임은 2자 이상 12자 이내로 입력해 주세요.';
    }

    // 한글, 영문, 숫자만 허용
    const isValidFormat = /^[ㄱ-ㅣ가-힣a-zA-Z0-9]+$/.test(trimmed);
    if (!isValidFormat) {
        return '닉네임은 한글, 영문, 숫자로만 입력해 주세요.';
    }

    return '';
};
