
const InventoriesRepository = require("../repositories/inventories");
const ProductsRepository = require("../repositories/products/index");

const {
} = require("../commons/handle_data/handle_object")


const {
    NotFoundError
} = require("../commons/response/error");

class InventoriesService {
    static async addStockToInventories({ shopId, productId, stock, location }) {
        const product = await ProductsRepository.getById(productId);
        if (!product)
            throw new NotFoundError("Product doesn't exist");
        InventoriesRepository.updateOneByCondition(
            { invent_shopId: shopId, invent_productId: productId },
            {
                $inc: { invent_stock: stock }, $set: { invent_location: location }
            },
            { upsert: true, new: true }
        )
    }
}
module.exports = InventoriesService