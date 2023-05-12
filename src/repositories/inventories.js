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

    updateInventories({ productId, quantity, cartId }) {
        return this.updateOne(
            {
                invent_productId: productId,
                invent_stock: { $gte: quantity }
            },
            {
                $inc: { invent_stock: -quantity },
                $push: {
                    invent_reservation: { quantity, cartId, createdOn: new Date() }
                }
            },
            { upsert: true, new: true }
        )
    }
}

module.exports = new InventoriesRepository()