
export const demonstrateMicrotasks = () => {
    console.log('1. Start');
    queueMicrotask(() => {
        console.log('3. Microtask (Promise)');
    });
    setTimeout(() => {
        console.log('4. Macrotask (Timeout)');
    }, 0);
    console.log('2. End');
};

/**
 * Chia nhỏ tác vụ nặng để không làm treo UI (Trả về Promise để dễ test)
 * @param {Array} items 
 * @param {Function} processFn 
 * @returns {Promise<void>}
 */
export const preventBlockingUI = (items, processFn) => {
    const CHUNK_SIZE = 10;

    return new Promise((resolve) => {
        const processChunk = (remaining) => {
            if (remaining.length === 0) {
                resolve(); // Báo hiệu đã xong toàn bộ
                return;
            }

            const current = remaining.slice(0, CHUNK_SIZE);
            current.forEach(processFn);

            const rest = remaining.slice(CHUNK_SIZE);
            // Dùng setTimeout để nhường chỗ cho Event Loop
            setTimeout(() => processChunk(rest), 0);
        };

        processChunk(items);
    });
};