/** Object với Validation: Tự động kiểm tra kiểu dữ liệu khi gán */
export const createValidatedObject = (schema) => {
    return new Proxy({}, {
        set(target, prop, value) {
            if (prop in schema) {
                const isValid = schema[prop](value);
                if (!isValid) {
                    throw new Error(`Giá trị của '${prop}' không hợp lệ!`);
                }
            }
            target[prop] = value;
            return true;
        }
    });
};

/** Logging Proxy: Theo dõi mọi thao tác truy cập thuộc tính */
export const createLoggingProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            console.log(`Đang đọc thuộc tính: ${prop}`);
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            console.log(`Đang ghi thuộc tính: ${prop} = ${value}`);
            return Reflect.set(target, prop, value);
        }
    });
};

/** Private Proxy: Ẩn các thuộc tính bắt đầu bằng dấu '_' */
export const createPrivateProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            if (prop.startsWith('_')) {
                throw new Error("Không có quyền truy cập thuộc tính riêng tư!");
            }
            return target[prop];
        },
        has(target, prop) {
            if (prop.startsWith('_')) return false;
            return prop in target;
        }
    });
};