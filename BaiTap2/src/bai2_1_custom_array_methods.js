export const customMap = (array, callback) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
};

export const customFilter = (array, callback) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
};

export const customReduce = (array, callback, initialValue) => {
    let accumulator = initialValue !== undefined ? initialValue : array[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
};

export const customFind = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) return array[i];
    }
    return undefined;
};

export const customEvery = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) return false;
    }
    return true;
};

export const customSome = (array, callback) => {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) return true;
    }
    return false;
};