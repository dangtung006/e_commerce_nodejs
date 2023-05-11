const BaseRepository = require("./base");
const DiscountEntity = require("../models/discount.model");

class DiscountRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: DiscountEntity
        })
    }
}

module.exports = new DiscountRepository()