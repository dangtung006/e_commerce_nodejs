const BaseRepository = require("../../repositories/base");
const ProductEntity = require("../../models/product/index");
class ProductRepository extends BaseRepository {
    constructor() {

        super({
            entity: ProductEntity
        });
        // this.product_name = product_name;
        // this.product_thumb = product_thumb;
        // this.product_desc = product_desc;
        // this.product_price = product_price;
        // this.product_quantity = product_quantity;
        // this.product_shop = product_shop;
        // this.product_attr = product_attr;
    }
}

module.exports = ProductRepository
