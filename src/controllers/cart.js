const {
    SuccessResponse,
    CreatedResponse
} = require("../commons/response/success");

const CartServices = require("../services/cart");

const addToCart = async (req, res) => {
    new CreatedResponse({
        message: "Success!",
        metaData: await CartServices.addToCart(req.body)
    }).send(res);
}

const updateCart = async (req, res) => {
    new SuccessResponse({
        message: "Success!",
        metaData: await CartServices.addToCartV2(req.body)
    }).send(res);
}

const deleteCart = async (req, res) => {
    new SuccessResponse({
        message: "Success!",
        metaData: await CartServices.deleteCart(req.body)
    }).send(res);
}

const listToCart = async (req, res) => {
    new SuccessResponse({
        message: "Success!",
        metaData: await CartServices.listToCart(req.body)
    }).send(res);
}
module.exports = {
    addToCart,
    updateCart,
    deleteCart,
    listToCart
}