const express = require('express')
const BaseRoute = require("./base");
const ShopController = require("../../controllers/shop")

class AuthRoutes extends BaseRoute {
    constructor(opt) {

        super({
            router: express.Router(),
            middlewares: opt && opt["middlewares"] ? opt["middlewares"] : null
        });

        // this.router.use(function (req, res, next) {
        //     if (1 == 0) {
        //         return next();
        //     } else {
        //         return res.send("Fail to access")
        //     }
        // });

        this.router.post("/shop/signUp", ShopController.signUp);
    }
}

module.exports = AuthRoutes