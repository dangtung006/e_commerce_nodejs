const express = require('express')
const AuthRoutes = require("./modules/auth.js");
const router = express.Router();

const routeConfigs = [
    {
        "routeName": "/auth",
        "router": new AuthRoutes().router
    }
]

const AppRoutes = () => {
    for (let idx = 0; idx < routeConfigs.length; idx++) {
        if (routeConfigs[idx].routeName && routeConfigs[idx].router) {
            router.use(routeConfigs[idx].routeName, routeConfigs[idx].router)
        }
    };
    return router;
}

module.exports = AppRoutes;