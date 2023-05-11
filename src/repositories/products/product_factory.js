const ClothesRepository = require("./clothes");
const ElectronicsRepository = require("./electrics");
const ProductsRepository = require("./index");

class ProductFactoryRepository {

    static productRepositories = {}

    static initProductRepositories(types, classRef) {
        this.productRepositories[types] = classRef
    }

    static async createProduct(productType, payload) {
        return new this.productRepositories[productType](payload).createProduct()
    }

    static async updateProduct(product_id, productType, payload) {

    }
};

ProductFactoryRepository.initProductRepositories("Clothes", ClothesRepository);
ProductFactoryRepository.initProductRepositories("Electronics", ElectronicsRepository);
module.exports = ProductFactoryRepository;