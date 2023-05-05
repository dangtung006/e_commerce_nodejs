const express = require('express')
const BaseRoute = require("./base");

class AuthRoutes extends BaseRoute {
    constructor(opt) {

        super({
            router: express.Router(),
            middlewares: opt && opt["middlewares"] ? opt["middlewares"] : null
        });

        this.router.use(function (req, res, next) {
            if (1 == 0) {
                return next();
            } else {
                return res.send("Fail to access")
            }
        });

        this.router.get("/test", function (req, res) {
            return res.send("ok")
        })
    }
}

module.exports = AuthRoutes