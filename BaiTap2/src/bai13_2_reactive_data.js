/** Tạo Object phản xạ (Reactive) */
export const reactive = (obj, callback) => {
    return new Proxy(obj, {
        set(target, prop, value) {
            const oldValue = target[prop];
            const result = Reflect.set(target, prop, value);
            
            // Nếu giá trị thực sự thay đổi thì mới gọi callback
            if (oldValue !== value) {
                callback(prop, value);
            }
            return result;
        }
    });
};

/** Watcher đơn giản */
export const watch = (obj, propToWatch, callback) => {
    return new Proxy(obj, {
        set(target, prop, value) {
            const result = Reflect.set(target, prop, value);
            if (prop === propToWatch) {
                callback(value);
            }
            return result;
        }
    });
};