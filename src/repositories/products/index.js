const BaseRepository = require("../../repositories/base");
const ProductEntity = require("../../models/product/index");
class ProductRepository extends BaseRepository {
    constructor() {
        super({
            entity: ProductEntity
        });
    }
}

module.exports = ProductRepository
