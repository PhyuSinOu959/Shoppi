export const endpoints = {
    category: {
        getListCategory: `${process.env.REACT_APP_API_BASE_URL}/Category/GetListCategory`,
        getListCategoryWithProduct: `${process.env.REACT_APP_API_BASE_URL}/Category/GetListCategoryWithProduct`,
        getListCateWithProduct_CateFilter: `${process.env.REACT_APP_API_BASE_URL}/Category/GetListCategoryWithProductAndCategoryFilter`,
        getListProduct: process.env.REACT_APP_DUMMY_API_URL
    },
    product: {
        getPagedListProduct: `${process.env.REACT_APP_API_BASE_URL}/Product/GetPagedListProduct`,
        getProductById: `${process.env.REACT_APP_API_BASE_URL}/Product/GetProductById`,
    },
    productMeasure: {
        getListProdtMeasure: `${process.env.REACT_APP_API_BASE_URL}/ProductMeasurement/GetListProductMeasurement`,
        getListProdMeasureById: `${process.env.REACT_APP_API_BASE_URL}/ProductMeasurement/GetListProductMeasurement`,
    }
}