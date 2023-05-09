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
        this.router.get("/checkJobQueue", TestController.checkJobQueueTask);
        this.router.get("/checkCallStackTask", TestController.checkCallStackTask);


        this.router.get("/checkAsyncForLoop", TestController.checkAsyncForLoop);
        this.router.get("/checkAsyncForOf", TestController.checkAsyncForOf);
        this.router.get("/checkAsyncForEach", TestController.checkAsyncForEach);
        this.router.get("/checkAsyncMap", TestController.checkAsyncMap);
    }
}

module.exports = AuthRoutes