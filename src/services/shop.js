const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ShopRepository = require("../repositories/shop");
const KeyRepository = require("../repositories/key_token");
const { createTokenPairs } = require("../helpers/auth");

const ShopRoles = {
    'shop': "SHOP",
    'writer': "WRITER",
    'editor': "EDITOR",
}

class ShopServices {

    static async signUp({ name, email, password }) {
        var shop = await ShopRepository.getOneByConditions({ email: email }).lean();

        if (shop) return console.log("shop existed");
        const hashPassword = await bcrypt.hash(password, 10);

        var newShop = await ShopRepository.create({
            name,
            email,
            password: hashPassword,
            roles: [ShopRoles['shop']]
        });

        if (newShop) {

            const { privateKey, publicKey } = crypto.generateKeyPair("rsa", {
                modulusLength: 4096
            });

            const keys = await KeyRepository.create({
                user: shop._id,
                publicKey: publicKey.toString()
            });

            if (keys.publicKey) {
                return console.log("make pulickey sucesd");
            };

            const tokens = createTokenPairs(
                { id: shop._id, email: shop.email },
                privateKey,
                publicKey
            );

            return {
                code: 200,
                message: "success",
                metadata: {
                    shop: shop,
                    tokens: tokens
                }
            }
        };

        return {
            code: 201,
            message: "fail",
            metadata: null
        }


    }

    static async signIn() {

    }


}

module.exports = ShopServices;