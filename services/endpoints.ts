export const endpoints = {
    category: {
        getListCategory: '/api/v1/Category/GetListCategory',
        getListCategoryWithProduct: '/api/v1/Category/GetListCategoryWithProduct',
        getListCateWithProduct_CateFilter: '/api/v1/Category/GetListCategoryWithProductAndCategoryFilter',
    },
    product: {
        getPagedListProduct: '/api/v1/Product/GetPagedListProduct',
        getProductById: '/api/v1/Product/GetProductById',
    },
    productMeasure: {
        getListProdtMeasure: 'api/v1/ProductMeasurement/GetListProductMeasurement',
        getListProdMeasureById: 'api/v1/ProductMeasurement/GetListProductMeasurement',
    }
}