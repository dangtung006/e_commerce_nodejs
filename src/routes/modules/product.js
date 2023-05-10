const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request");
const ProductController = require("../../controllers/product");
class AuthRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.initRoutes();
    }

    initRoutes() {
        const shopProRoutes = this.initShopProductRoutes();
        this.router.use("/shop", shopProRoutes);
    }

    initShopProductRoutes() {
        const shopProductRoutes = express.Router();
        shopProductRoutes.post("/create", wrapperAsync(ProductController.createProduct));
        return shopProductRoutes;
    }

    initUserProductRoutes() { }
}

module.exports = AuthRoutes