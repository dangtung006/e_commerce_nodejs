const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request");

const CartController = require("../../controllers/cart");

class AuthRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.initRoutes();

    }

    initRoutes() {
        this.router.post("/add", wrapperAsync(CartController.addToCart))
        this.router.get("/list", wrapperAsync(CartController.listToCart));
        this.router.patch("/update", wrapperAsync(CartController.updateCart));
        this.router.patch("/delete", wrapperAsync(CartController.deleteCart));
    }
}

module.exports = AuthRoutes