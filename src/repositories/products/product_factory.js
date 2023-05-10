const ClothesRepository = require("./clothes");
const ElectronicsRepository = require("./electrics");

class ProductFactory {

    static async createProduct(productType, payload) {
        if (productType == "Clothes") return new ClothesRepository(payload).createProduct()
        if (productType == "Electronics") return new ElectronicsRepository(payload).createProduct();
    }
};

module.exports = ProductFactory;