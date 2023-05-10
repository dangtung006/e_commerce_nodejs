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
        this.router.post("/create", wrapperAsync(ProductController.createProduct))
    }
}

module.exports = AuthRoutes