/** Debounce: Chỉ thực hiện sau khi ngừng tác động một khoảng thời gian */
export const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

/** Throttle: Thực hiện tối đa 1 lần trong mỗi khoảng giới hạn thời gian */
export const throttle = (fn, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};