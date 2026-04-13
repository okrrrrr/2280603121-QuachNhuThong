/**
 * HttpClient wrapper cho Fetch API
 */
export const HttpClient = {
    async request(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Tự động parse JSON
        return response.json();
    },

    get(url, options) {
        return this.request(url, { ...options, method: 'GET' });
    },

    post(url, data, options) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
};