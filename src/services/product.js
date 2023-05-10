const ProductFactoryRepository = require("../repositories/products/product_factory");
const ProductRepository = require("../repositories/products/index");

const {
    pickObjByKey
} = require("../commons/handle_data/handle_object")


const {
    BadRequestError,
    AuthFailureError,
    ForbidenRequestError,
    InternalServerError
} = require("../commons/response/error");



class ProductServices {
    static async createProduct(product_type, data) {
        return ProductFactoryRepository.createProduct(product_type, data);
    }

    static async getDraftShopProducts(shop) {
        return ProductRepository.getDraftListForShopDefault(shop);
    }


    static async getPublishedShopProducts(shop) {
        return ProductRepository.getPublishedListForShopDefault(shop);
    }

    static async publishProductByShop({ product_shop, product_id }) {
        var foundProduct = await ProductRepository.getOneByConditions({ product_shop, _id: product_id });
        if (!foundProduct)
            throw new BadRequestError("Product not found");

        foundProduct.isPublished = true;
        foundProduct.isDraft = false;

        const result = await foundProduct.save();
        if (!result)
            throw new InternalServerError("Update failed");
        return { result: result._id }
    }
}
module.exports = ProductServices;