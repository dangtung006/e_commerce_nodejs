const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request")
const TestController = require("../../controllers/test");

class TestRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.initTestRoutes();
    }

    initTestRoutes() {
        const asyncTestRoutes = this.initAsyncTestRoutes();
        const asyncLoopRoutes = this.initAsyncLoopRoutes();

        this.router.use("/async", asyncTestRoutes)
        this.router.use("/async_loop", asyncLoopRoutes);
    }

    initAsyncTestRoutes() {
        const asyncTestRoutes = express.Router();
        asyncTestRoutes.get("/checkPromise", TestController.handleAsyncAwaitPromise);
        asyncTestRoutes.get("/checkPromiseAll", TestController.handleAsyncAwaitPromiseAll);
        asyncTestRoutes.get("/checkAsyncAwait", TestController.handleAsyncAwait);
        asyncTestRoutes.get("/checkJobQueue", TestController.checkJobQueueTask);
        asyncTestRoutes.get("/checkCallStackTask", TestController.checkCallStackTask);
        return asyncTestRoutes;
    }

    initAsyncLoopRoutes() {
        const asyncLoopRoutes = express.Router();
        asyncLoopRoutes.get("/checkAsyncForLoop", TestController.checkAsyncForLoop);
        asyncLoopRoutes.get("/checkAsyncForOf", TestController.checkAsyncForOf);
        asyncLoopRoutes.get("/checkAsyncForEach", TestController.checkAsyncForEach);
        asyncLoopRoutes.get("/checkAsyncMap", TestController.checkAsyncMap);
        return asyncLoopRoutes;
    }
}

module.exports = TestRoutes