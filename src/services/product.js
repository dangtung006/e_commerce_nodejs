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
}
module.exports = ProductServices;