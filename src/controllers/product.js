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



module.exports = {
    createProduct,
    getDraftShopProducts,
    getPublishedShopProducts,
    publishProductByShop
}