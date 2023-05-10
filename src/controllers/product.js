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


module.exports = {
    createProduct
}