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

    // static async getAllDraftForShop(shop) {
    //     return ProductsRepository().getDraftListForShopDefault(shop);
    // }

    // static async getAllPublishedForShop(shop) {
    //     return ProductsRepository().getDraftListForShopDefault(shop);
    // }
};

ProductFactoryRepository.initProductRepositories("Clothes", ClothesRepository);
ProductFactoryRepository.initProductRepositories("Electronics", ElectronicsRepository);
module.exports = ProductFactoryRepository;