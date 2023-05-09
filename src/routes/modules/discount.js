const express = require('express')
const BaseRoute = require("./base");
const {
    wrapperAsync
} = require("../../middlewares/request");

class AuthRoutes extends BaseRoute {
    constructor({ }) {
        super({
            router: express.Router(),
        });
        this.initRoutes();

    }

    initRoutes() { }
}

module.exports = AuthRoutes