const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request");

const InventoriesController = require("../../controllers/inventories")

class AuthRoutes extends BaseRoute {
    constructor({ middlewares }) {
        super({
            router: express.Router(),
        });
        this.initRoutes();

    }

    initRoutes() {
        this.router.post("/addStock", wrapperAsync(InventoriesController.addStockToInventories))
    }
}

module.exports = AuthRoutes