/**
 * Bài 12.3: Date Utilities
 * 
 * Module cung cấp các tiện ích xử lý Thời gian
 * @module dateUtils
 */

/**
 * Format date thành chuỗi
 * Hỗ trợ YYYY, MM, DD, HH, mm, ss
 */
function format(date, formatStr) {
    const d = new Date(date);
    const map = {
        YYYY: d.getFullYear(),
        MM: String(d.getMonth() + 1).padStart(2, '0'),
        DD: String(d.getDate()).padStart(2, '0'),
        HH: String(d.getHours()).padStart(2, '0'),
        mm: String(d.getMinutes()).padStart(2, '0'),
        ss: String(d.getSeconds()).padStart(2, '0')
    };

    return formatStr.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
}

/**
 * Thêm số ngày vào một ngày cụ thể
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Tính khoảng cách (ngày) giữa 2 thời điểm
 */
function diffInDays(date1, date2) {
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Kiểm tra năm nhuận
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Lấy số thứ tự tuần trong năm
 */
function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Lấy thời điểm bắt đầu của một đơn vị (day, month, year)
 */
function startOf(date, unit) {
    const d = new Date(date);
    if (unit === 'day') {
        d.setHours(0, 0, 0, 0);
    } else if (unit === 'month') {
        d.setHours(0, 0, 0, 0);
        d.setDate(1);
    } else if (unit === 'year') {
        d.setHours(0, 0, 0, 0);
        d.setMonth(0, 1);
    }
    return d;
}

module.exports = {
    format,
    addDays,
    subtractDays: (date, days) => addDays(date, -days),
    diffInDays,
    isLeapYear,
    getWeekNumber,
    startOf
};
