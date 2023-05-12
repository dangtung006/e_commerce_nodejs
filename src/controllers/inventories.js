const {
    SuccessResponse,
    CreatedResponse
} = require("../commons/response/success");

const InventoriesServices = require("../services/inventories");

const addStockToInventories = async (req, res) => {
    new SuccessResponse({
        message: "Success!",
        metaData: await InventoriesServices.addToCart(req.body)
    }).send(res);
}
module.exports = {
    addStockToInventories
}