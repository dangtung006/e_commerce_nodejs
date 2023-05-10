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

    static async getAllDraftForShop() {
        return new ProductsRepository().getDraftListForShopDefault();
    }
    static async getAllPublishedForShop() {
        return new ProductsRepository().getPublishedListForShop();
    }
};

ProductFactory.initProductRepositories("Clothes", ClothesRepository);
ProductFactory.initProductRepositories("Electronics", ElectronicsRepository);
module.exports = ProductFactoryRepository;