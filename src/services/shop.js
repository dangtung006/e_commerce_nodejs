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

        shop = await ShopRepository.create({
            name,
            email,
            password: hashPassword,
            roles: [ShopRoles['shop']]
        })

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

        return tokens;
    }

    static async signIn() {

    }


}

module.exports = ShopServices;