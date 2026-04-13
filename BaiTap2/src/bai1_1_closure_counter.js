/**
 * Tạo một bộ đếm (counter) có giá trị được bảo vệ.
 * @returns {Object} Các phương thức để thao tác với counter.
 */
export const createCounter = () => {
    let count = 0;

    return {
        /** Tăng giá trị lên 1 */
        increment() {
            count++;
        },
        /** Giảm giá trị xuống 1 */
        decrement() {
            count--;
        },
        /** Lấy giá trị hiện tại */
        getValue() {
            return count;
        },
        /** Đặt lại giá trị về 0 */
        reset() {
            count = 0;
        }
    };
};