/**
 * Validate định dạng Email
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validate số điện thoại Việt Nam (các đầu số 03, 05, 07, 08, 09)
 * @param {string} phone 
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
    const regex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
    return regex.test(phone);
};

/**
 * Validate độ mạnh mật khẩu: ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
 * @param {string} password 
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    // Lookahead assertions để kiểm tra nhiều điều kiện đồng thời
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

/**
 * Trích xuất tất cả URLs từ đoạn văn bản
 * @param {string} text 
 * @returns {string[]}
 */
export const extractUrls = (text) => {
    const regex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
    return text.match(regex) || [];
};

/**
 * Bao bọc các chuỗi khớp với pattern bằng thẻ HTML (mặc định là <span>)
 * @param {string} text 
 * @param {string|RegExp} pattern 
 * @returns {string}
 */
export const highlightMatches = (text, pattern) => {
    const regex = new RegExp(pattern, 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
};