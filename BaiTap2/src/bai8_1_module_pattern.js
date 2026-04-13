/** * Module Calculator sử dụng Module Pattern 
 */
export const Calculator = (() => {
    let history = []; // Private variable

    // Private method
    const _validate = (num) => {
        if (typeof num !== 'number') throw new Error("Phải là số!");
    };

    const _addHistory = (operation, result) => {
        history.push({ operation, result, date: new Date() });
    };

    return {
        add: (a, b) => {
            _validate(a); _validate(b);
            const res = a + b;
            _addHistory('ADD', res);
            return res;
        },
        subtract: (a, b) => {
            _validate(a); _validate(b);
            const res = a - b;
            _addHistory('SUBTRACT', res);
            return res;
        },
        getHistory: () => [...history], // Trả về bản copy để bảo mật
        clearHistory: () => { history = []; }
    };
})();