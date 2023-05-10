const ClothesRepository = require("./clothes");
const ElectronicsRepository = require("./clothes");

class ProductFactory {
    createProduct(productType, payload) {
        if (productType == "clothe") return ClothesRepository(payload);
        if (productType == "electronic") return ElectronicsRepository(payload);
    }
};

module.exports = ProductFactory;