/** * Lời chào trì hoãn 
 */
export const delayedGreeting = (name, delay, callback) => {
    setTimeout(() => {
        callback(`Xin chào, ${name}!`);
    }, delay);
};

/** * Mô phỏng đọc file 
 */
export const readFileSimulation = (filename, callback) => {
    setTimeout(() => {
        if (filename === 'error.txt') {
            callback('Lỗi: Không tìm thấy file!', null);
        } else {
            callback(null, `Nội dung của ${filename}`);
        }
    }, 500);
};

/** * Mô phỏng Callback Hell 
 */
export const callbackHell = (callback) => {
    readFileSimulation('file1.txt', (err1, data1) => {
        readFileSimulation('file2.txt', (err2, data2) => {
            readFileSimulation('file3.txt', (err3, data3) => {
                callback(`${data1}, ${data2}, ${data3}`);
            });
        });
    });
};