const {
    SuccessResponse,
    CreatedResponse
} = require("../commons/response/success");

const ProductServices = require("../services/product");

const createProduct = async (req, res) => {
    return new CreatedResponse({
        message: "SignUp Success!",
        metaData: await ProductServices.createProduct(req.body.product_type, {
            ...req.body,
            product_shop: "645a08a454ae1caa21c56d47"
        })
    }).send(res);
}

const getDraftShopProducts = async (req, res) => {
    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.getDraftShopProducts(req.params.shop)
    }).send(res);
}

const getPublishedShopProducts = async (req, res) => {
    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.getPublishedShopProducts(req.params.shop)
    }).send(res);
}

const publishProductByShop = async (req, res) => {
    console.log(req.body);

    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.publishProductByShop(req.body)
    }).send(res);
}

const unPublishProductByShop = async (req, res) => {
    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.unPublishProductByShop(req.body)
    }).send(res);
}


//Public accesss
const getSearchProduct = async (req, res) => {
    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.handleSearchProduct(req.params.keySearch)
    }).send(res);
}

const getProductList = async (req, res) => {
    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.getProductList(req.query)
    }).send(res);
}

const getProductDetail = async (req, res) => {
    return new SuccessResponse({
        message: "Success!",
        metaData: await ProductServices.getProductDetail(req.params)
    }).send(res);
}

module.exports = {
    createProduct,
    getDraftShopProducts,
    getPublishedShopProducts,
    publishProductByShop,
    unPublishProductByShop,
    getSearchProduct,
    getProductList,
    getProductDetail
}