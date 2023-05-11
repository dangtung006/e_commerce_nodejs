const ProductFactoryRepository = require("../repositories/products/product_factory");
const ProductRepository = require("../repositories/products/index");

const {
    pickObjByKey
} = require("../commons/handle_data/handle_object")


const {
    BadRequestError,
    InternalServerError
} = require("../commons/response/error");



class ProductServices {
    static async createProduct(product_type, data) {
        return ProductFactoryRepository.createProduct(product_type, data);
    }

    static async updateProduct(product_id, update) {
        const { product_type } = update;
        return ProductFactoryRepository.updateProduct(product_id, product_type, update);
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

    static async unPublishProductByShop({ product_shop, product_id }) {
        var foundProduct = await ProductRepository.getOneByConditions({ product_shop, _id: product_id });
        if (!foundProduct)
            throw new BadRequestError("Product not found");

        foundProduct.isPublished = false;
        foundProduct.isDraft = true;

        const result = await foundProduct.save();
        if (!result)
            throw new InternalServerError("Update failed");
        return { result: result._id }
    }

    static async handleSearchProduct({ keySearch }) {
        const regexSearch = new RegExp(keySearch);
        r = await ProductRepository._Entity.find(
            {
                isPublished: true,
                $text: { $search: regexSearch }
            },
            { score: { $meta: 'textScore' } }
        );
        console.log(r);
        return {
            products: r
        }
    }

    static async getProductList({ offset, limit, sort }) {
        const skip = (offset - 1) * limit;
        const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 };
        const result = await ProductRepository._Entity.find({ isPublished: true }).skip(skip).limit(limit).sort(sortBy).lean();
        return { products: result }
    }

    static async getProductDetail({ product_id }) {
        const result = await ProductRepository.getById({ _id: product_id });
        return { product: result }
    }
}
module.exports = ProductServices;