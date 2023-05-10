const ProductRepository = require("../../repositories/products/index")
const BaeRepository = require("../../repositories/base");
const ClothesEntity = require("../../models/product/clothing");
const {
    BadRequestError
} = require("../../commons/response/error")

class ClothesRepository extends BaeRepository {
    constructor(opt) {
        super({
            entity: ClothesEntity
        });

        this.ProductRepository = ProductRepository
        this.product = opt;
    }

    async createProduct() {
        const { product_attr, product_shop } = this.product;
        const newClothes = await this._Entity.create({ ...product_attr, product_shop }).then(data => data).catch(err => null);
        if (!newClothes)
            throw new BadRequestError("Create Clothes Err");

        const newProduct = await this.ProductRepository.create({
            _id: newClothes._id,
            ...this.product
        });
        if (!newProduct)
            throw BadRequestError("Create Product Err");

        return newProduct;
    }

}

module.exports = ClothesRepository
