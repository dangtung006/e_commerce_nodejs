const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request")
const ShopController = require("../../controllers/shop");

class AuthRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.middlewares = middlewares;
        this.initRoutes();

    }

    initRoutes() {
        this.router.get("/test", async (req, res) => {
            return res.send("test routes")
        })
    }
}

module.exports = AuthRoutes