/**
 * Bài 8.2: Router Module
 * 
 * Module quản lý routing với hỗ trợ params (:id) và middlewares
 * @module routerModule
 */

class Router {
    constructor() {
        this.routes = [];
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRoute(method, path, handler) {
        const paramNames = [];
        const regexPath = path.replace(/:([^\/]+)/g, (m, p1) => {
            paramNames.push(p1);
            return '([^\/]+)';
        });

        this.routes.push({
            method: method.toUpperCase(),
            path,
            regex: new RegExp(`^${regexPath}$`),
            paramNames,
            handler
        });
    }

    get(path, handler) { this.addRoute('GET', path, handler); }
    post(path, handler) { this.addRoute('POST', path, handler); }
    put(path, handler) { this.addRoute('PUT', path, handler); }
    delete(path, handler) { this.addRoute('DELETE', path, handler); }

    /**
     * Tìm và khớp route
     * @param {string} method - HTTP method
     * @param {string} urlPath - Đường dẫn URL
     * @returns {Object|null} Thông tin route và params
     */
    match(method, urlPath) {
        for (const route of this.routes) {
            if (route.method === method.toUpperCase()) {
                const match = urlPath.match(route.regex);
                if (match) {
                    const params = {};
                    route.paramNames.forEach((name, index) => {
                        params[name] = match[index + 1];
                    });
                    return { ...route, params };
                }
            }
        }
        return null;
    }

    /**
     * Xử lý request qua các middlewares và handler
     */
    async handle(req, res) {
        const routeMatch = this.match(req.method, req.url.split('?')[0]);
        if (!routeMatch) return null;

        req.params = routeMatch.params;

        let index = 0;
        const next = async () => {
            if (index < this.middlewares.length) {
                await this.middlewares[index++](req, res, next);
            } else {
                await routeMatch.handler(req, res);
            }
        };

        await next();
        return true;
    }
}

module.exports = Router;
