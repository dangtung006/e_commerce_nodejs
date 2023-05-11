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
        const publicProductRoutes = this.unPublishProductByShop();

        this.router.use("/shop", shopProRoutes);
        this.router.use("/", publicProductRoutes);
    }

    initShopProductRoutes() {
        const shopProductRoutes = express.Router();
        shopProductRoutes.get("/draft/all/:shop", wrapperAsync(ProductController.getDraftShopProducts))
        shopProductRoutes.get("/published/all", wrapperAsync(ProductController.getPublishedShopProducts))
        shopProductRoutes.post("/update/publish", wrapperAsync(ProductController.publishProductByShop))
        shopProductRoutes.post("/update/unPublish", wrapperAsync(ProductController.unPublishProductByShop))
        shopProductRoutes.post("/create", wrapperAsync(ProductController.createProduct));
        shopProductRoutes.patch("/update/:product_id", wrapperAsync(ProductController.updateProduct));
        return shopProductRoutes;
    }

    initPublicProductRoutes() {
        const publicProductRoutes = express.Router();
        publicProductRoutes.get("/search/:keySearch", wrapperAsync(ProductController.getSearchProduct));
        publicProductRoutes.get("/all", wrapperAsync(ProductController.getProductList));
    }
}

module.exports = AuthRoutes