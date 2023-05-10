const BaseRepository = require("../../repositories/base");
const ProductEntity = require("../../models/product/index");

class ProductsRepository extends BaseRepository {
    constructor() {
        super({
            entity: ProductEntity
        });
    }

    getDraftListForShopDefault(product_shop) {
        const query = { product_shop, isDraft: true };
        return this.getListByConditions(query);
    }

    getDraftListForShopByOpt(product_shop, offset, limit) {
        const query = { product_shop, isDraft: true };
        return this.getListByConditions(query, { offset, limit });
    }

    getPublishedListForShop(product_shop, offset, limit) {
        const query = { product_shop, isPublished: true };
        return this.getListByConditions(query, { offset, limit });
    }


}

module.exports = ProductsRepository
