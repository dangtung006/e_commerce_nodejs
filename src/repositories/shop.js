const BaseRepository = require("./base");
const ShopModel = require("../models/shop.model");

class ShopRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: ShopModel
        })
    }
}

module.exports = new ShopRepository()