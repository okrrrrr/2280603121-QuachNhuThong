/**
 * Kiểm tra số thẻ tín dụng bằng thuật toán Luhn.
 */
const isCreditCard = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
};

const isDate = (str, format) => {
    if (format === 'YYYY-MM-DD') {
        // Kiểm tra format bằng Regex trước
        if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;

        const [year, month, day] = str.split('-').map(Number);
        const d = new Date(year, month - 1, day);

        // Kiểm tra xem các giá trị có bị JS tự động tràn không
        // (Ví dụ: 30/02 tràn sang 02/03 thì d.getDate() sẽ là 2, không phải 30)
        return (
            d.getFullYear() === year &&
            d.getMonth() + 1 === month &&
            d.getDate() === day
        );
    }
    return false;
};

const isStrongPassword = (str) => {
    // Regex này bao gồm cả dấu # và các ký tự đặc biệt phổ biến khác
    // (?=.*[...]) là lookahead để đảm bảo bắt buộc có đủ các loại ký tự
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?#]).{8,}$/;
    return strongRegex.test(str);
};

module.exports = {
    isDate,
    isEmail: (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),
    isURL: (str) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(str),
    isPhoneVN: (str) => /(0[3|5|7|8|9])+([0-9]{8})\b/.test(str),
    isStrongPassword,
    isCreditCard
};