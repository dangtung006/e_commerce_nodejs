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

        this.ProductRepository = new ProductRepository()
        this.product = opt;
    }

    async createProduct() {
        const product = { ...this.product, product_attr };
        const newClothe = await this._Entity.create(product_attr).then(data => data).catch(err => null);

        if (!newClothe)
            throw new BadRequestError("Create Clothes Err");

        const newProduct = await this.ProductRepository.create(product);
        if (!newProduct)
            throw BadRequestError("Create Product Err");

        return newProduct;
    }

}

module.exports = ClothesRepository
