const ClothesRepository = require("./clothes");
const ElectronicsRepository = require("./clothes");

class ProductFactory {
    static createProduct(productType, payload) {
        if (productType == "clothe") return new ClothesRepository(payload).createProduct();
        if (productType == "electronic") return new ElectronicsRepository(payload).createProduct();
    }
};

module.exports = ProductFactory;