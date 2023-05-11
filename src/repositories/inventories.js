const BaseRepository = require("./base");
const InventoryEntity = require("../models/inventories.model");
s
class InventoriesRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: InventoryEntity
        })
    }

    createInventories({ productId, shopId, stock, location = "unknow" }) {
        return this.create({
            invent_productId: productId,
            invent_shopId: shopId,
            invent_stock: stock,
            invent_location: location
        })
    }
}

module.exports = new InventoriesRepository()