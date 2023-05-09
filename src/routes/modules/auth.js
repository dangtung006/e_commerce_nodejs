const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request")
const ShopController = require("../../controllers/shop");

class AuthRoutes extends BaseRoute {
    constructor({ middlewares }) {
        console.log("middlewares : ", middlewares)
        super({
            router: express.Router(),
        });
        this.middlewares = middlewares;
        this.initRoutes();

    }

    initRoutes() {
        this.router.post("/shop/signUp", wrapperAsync(ShopController.signUp));
        this.router.post("/shop/signIn", wrapperAsync(ShopController.signIn));
        if (this.middlewares) {
            this.router.use(wrapperAsync(this.middlewares));
            this.router.post("/shop/signOut", wrapperAsync(ShopController.signOut));
            this.router.post("/shop/refresh", wrapperAsync(ShopController.handleRefreshToken));
        }
    }
}

module.exports = AuthRoutes