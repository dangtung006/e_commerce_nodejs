const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request");
const ProductService = require("../../services/product");

class AuthRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.initRoutes();

    }

    initRoutes() {
        this.post("/create", wrapperAsync(ProductService.createProduct))
    }
}

module.exports = AuthRoutes