const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request")
const TestController = require("../../controllers/test");

class AuthRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.initRoutes();

    }

    initRoutes() {
        this.router.get("/checkPromise", TestController.handleAsyncAwaitPromise);
        this.router.get("/checkPromiseAll", TestController.handleAsyncAwaitPromiseAll);
        this.router.get("/checkAsyncAwait", TestController.handleAsyncAwait);
    }
}

module.exports = AuthRoutes