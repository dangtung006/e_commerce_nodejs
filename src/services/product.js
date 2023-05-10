const ProductFactoryRepository = require("../repositories/products/product_factory");

const {
    pickObjByKey
} = require("../commons/handle_data/handle_object")


const {
    BadRequestError,
    AuthFailureError,
    ForbidenRequestError
} = require("../commons/response/error");



class ProductServices {
    static async createProduct(product_type, data) {
        return ProductFactoryRepository.createProduct(product_type, data);
    }

    static async getDraftShopProducts(shop) {
        return ProductFactoryRepository.getAllDraftForShop(shop);
    }


    static async getPublishedShopProducts() {
        return ProductFactoryRepository.getPublishedShopProducts()
    }
}
module.exports = ProductServices;