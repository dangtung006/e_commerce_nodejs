const CartRepository = require("../repositories/cart");
const {
    pickObjByKey
} = require("../commons/handle_data/handle_object")

const {
    BadRequestError,
    AuthFailureError,
    ForbidenRequestError
} = require("../commons/response/error");

class CartService {
    static async addToCart({ userId, product = {} }) {
        const cart = await CartRepository.getOneByConditions({ userId, product });

        if (!cart)
            return CartRepository.createUserCart({ userId, product });

        if (!cart.cart_products.length) {
            cart.cart_products = [product];
            return cart.save();
        }

        return CartRepository.updateCartProductQuantiy({ userId, product })
    }
}

module.exports = CartService;