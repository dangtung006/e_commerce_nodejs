const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request")
const ShopController = require("../../controllers/shop");

class AuthRoutes extends BaseRoute {
    constructor(opt) {

        super({
            router: express.Router(),
            middlewares: opt && opt["middlewares"] ? opt["middlewares"] : null
        });

        this.router.post("/shop/signUp", wrapperAsync(ShopController.signUp));
        this.router.post("/shop/signIn", wrapperAsync(ShopController.signIn));

        if (middlewares) {
            this.router.use(middlewares);
            this.router.post("/shop/signOut", wrapperAsync(ShopController.signOut));
            this.router.post("/shop/refresh", wrapperAsync(ShopController.handleRefreshToken));
        }
    }
}

module.exports = AuthRoutes