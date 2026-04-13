/** Lấy sản phẩm điện tử, còn hàng, giá > 200 */
export const getExpensiveInStockElectronics = (products) => {
    return products
        .filter(p => p.category === 'Electronics' && p.inStock && p.price > 200);
};

/** Lấy sản phẩm rẻ nhất của mỗi Category */
export const getCheapestProductPerCategory = (products) => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.map(cat => {
        const catProducts = products.filter(p => p.category === cat);
        return catProducts.reduce((min, p) => p.price < min.price ? p : min);
    });
};

/** Tính toán thống kê theo từng Category */
export const calculateCategoryStats = (products) => {
    const groups = products.reduce((acc, p) => {
        if (!acc[p.category]) acc[p.category] = { count: 0, total: 0 };
        acc[p.category].count++;
        acc[p.category].total += p.price;
        return acc;
    }, {});

    Object.keys(groups).forEach(cat => {
        groups[cat].average = groups[cat].total / groups[cat].count;
    });
    return groups;
};