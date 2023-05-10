const ClothesRepository = require("./clothes");
const ElectronicsRepository = require("./electrics");

class ProductFactory {

    static productRepositories = {}
    static initProductRepositories(types, classRef) {
        this.productRepositories[types] = classRef
    }
    static async createProduct(productType, payload) {
        return new this.productRepositories[productType](payload).createProduct()
    }
};

ProductFactory.initProductRepositories("Clothes", ClothesRepository);
ProductFactory.initProductRepositories("Electronics", ElectronicsRepository);
module.exports = ProductFactory;