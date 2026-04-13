/** Lấy danh sách tên sản phẩm */
export const getProductNames = (products) => products.map(p => p.name);

/** Lọc sản phẩm còn hàng */
export const getInStockProducts = (products) => products.filter(p => p.inStock);

/** Tính tổng giá trị tất cả sản phẩm */
export const getTotalValue = (products) => 
    products.reduce((sum, p) => sum + p.price, 0);

/** Nhóm sản phẩm theo Category */
export const groupByCategory = (products) => {
    return products.reduce((acc, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);
        return acc;
    }, {});
};

/** Sắp xếp theo giá */
export const sortByPrice = (products, order = 'asc') => {
    return [...products].sort((a, b) => 
        order === 'asc' ? a.price - b.price : b.price - a.price
    );
};

/** Áp dụng giảm giá (Trả về mảng mới, không sửa mảng cũ) */
export const applyDiscount = (products, percent) => {
    return products.map(p => ({
        ...p,
        price: p.price * (1 - percent / 100)
    }));
};