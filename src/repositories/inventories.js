const BaseRepository = require("./base");
const InventoryEntity = require("../models/inventories.model");
s
class InventoriesRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: InventoryEntity
        })
    }
}

module.exports = new InventoriesRepository()