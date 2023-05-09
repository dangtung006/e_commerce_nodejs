const express = require('express')
const AuthRoutes = require("./modules/auth.js");
const TestRoutes = require("./modules/test.js");
const CartRoutes = require("./modules/cart.js");
const ProductRoutes = require("./modules/product.js");
const OrderRoutes = require("./modules/order.js");
const DiscountRoutes = require("./modules/discount.js");

const router = express.Router();
const { apiKey, permission, authentication } = require("../middlewares/auth.js")
const routeConfigs = [
    {
        "routeName": "/auth",
        "router": new AuthRoutes({ middlewares: authentication }).router
    },
    {
        "routeName": "/product",
        "router": new ProductRoutes({ middlewares: authentication }).router
    },
    {
        "routeName": "/discount",
        "router": new DiscountRoutes({ middlewares: authentication }).router
    },
    {
        "routeName": "/cart",
        "router": new CartRoutes({ middlewares: authentication }).router
    },
    {
        "routeName": "/order",
        "router": new OrderRoutes({ middlewares: authentication }).router
    },
    {
        "routeName": "/test",
        "router": new TestRoutes({}).router
    }
]

const AppRoutes = () => {

    // router.use(apiKey);
    // router.use(permission("0000"));

    for (let idx = 0; idx < routeConfigs.length; idx++) {
        if (routeConfigs[idx].routeName && routeConfigs[idx].router) {
            router.use(routeConfigs[idx].routeName, routeConfigs[idx].router)
        }
    };
    return router;
}

module.exports = AppRoutes;