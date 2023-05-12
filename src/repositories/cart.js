const BaseRepository = require("./base");
const CartEntity = require("../models/cart.model");

class CartRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: CartEntity
        })
    }

    createUserCart({ userId, product }) {
        return this.updateOneByCondition(
            { cart_userId: userId, cart_state: "active" },
            { $addToSet: { cart_products: product } },
            { upsert: true, new: true }
        )
    }

    updateCartProductQuantiy({ userId, product }) {
        const { productId, quantity } = product;

        return this.updateOneByCondition(
            {
                cart_userId: userId,
                cart_state: "active",
                'cart_products.productId': productId
            },
            { $inc: { 'cart_products.$.productId': quantity } },
            { upsert: true, new: true }
        )
    }
}

module.exports = new CartRepository()