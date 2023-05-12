const BaseRepository = require("./base");
const OrdersEntity = require("../models/order.js");

class OrdersRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: OrdersEntity
        })
    }
}

module.exports = new OrdersRepository()