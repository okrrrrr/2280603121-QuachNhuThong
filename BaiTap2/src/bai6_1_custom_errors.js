/** Base classes cho các loại lỗi tùy chỉnh */
export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}

/** Function kiểm tra logic User */
export const validateUser = (user) => {
    if (!user.username) throw new ValidationError("Username không được để trống");
    if (!user.email.includes("@")) throw new ValidationError("Email không hợp lệ");
    return true;
};

/** Xử lý lỗi dựa trên loại lỗi (Pattern matching) */
export const handleError = (error) => {
    if (error instanceof ValidationError) return `Dữ liệu sai: ${error.message}`;
    if (error instanceof NetworkError) return `Lỗi kết nối: ${error.message}`;
    if (error instanceof AuthenticationError) return `Lỗi bảo mật: ${error.message}`;
    return "Lỗi không xác định";
};