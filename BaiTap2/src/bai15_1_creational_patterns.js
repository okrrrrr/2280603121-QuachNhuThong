/**
 * Singleton: Đảm bảo chỉ có duy nhất một thực thể DatabaseConnection
 */
export class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        this.connectionString = 'mysql://localhost:3306/mydb';
        this.isConnected = true;
        DatabaseConnection.instance = this;
    }

    query(sql) {
        return `Executing: ${sql}`;
    }
}

/**
 * Factory: Tạo các loại User khác nhau mà không cần lộ logic khởi tạo
 */
class User {
    constructor(name) { this.name = name; this.role = 'User'; }
}

class Admin {
    constructor(name) { this.name = name; this.role = 'Admin'; }
}

export class UserFactory {
    static create(name, type) {
        switch (type) {
            case 'admin': return new Admin(name);
            case 'user': return new User(name);
            default: throw new Error('Loại user không hợp lệ');
        }
    }
}

/**
 * Builder: Xây dựng câu lệnh SQL phức tạp từng bước một
 */
export class QueryBuilder {
    constructor() {
        this.queryParts = { table: '', fields: '*', where: [] };
    }

    from(table) {
        this.queryParts.table = table;
        return this;
    }

    select(fields) {
        this.queryParts.fields = fields;
        return this;
    }

    where(condition) {
        this.queryParts.where.push(condition);
        return this;
    }

    build() {
        let sql = `SELECT ${this.queryParts.fields} FROM ${this.queryParts.table}`;
        if (this.queryParts.where.length > 0) {
            sql += ` WHERE ${this.queryParts.where.join(' AND ')}`;
        }
        return sql;
    }
}