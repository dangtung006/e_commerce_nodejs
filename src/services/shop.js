const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ShopRepository = require("../repositories/shop");
const KeyRepository = require("../repositories/key_token");
const { createTokenPairs } = require("../helpers/auth");
const { generateHashString } = require("../helpers/crypto");
const {
    BadRequestError,
    AuthFailureError
} = require("../commons/response/error")

const ShopRoles = {
    'shop': "SHOP",
    'writer': "WRITER",
    'editor': "EDITOR",
}

class ShopServices {

    static async signUp({ name, email, password }) {
        var shop = await ShopRepository.getOneByConditions({ email: email }).lean();
        if (shop)
            throw new BadRequestError("Shop registed");

        var newShop = await ShopRepository.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            roles: [ShopRoles['shop']]
        });

        const privateKey = generateHashString(64);
        const publicKey = generateHashString(64);

        const tokens = createTokenPairs(
            {
                id: shop._id,
                email: shop.email
            },
            publicKey, privateKey
        );

        await KeyRepository.updateOne(
            { user: newShop._id },
            {
                user: newShop._id,
                publicKey: privateKey,
                privateKey: publicKey,
                refreshToken: tokens.refreshToken
            },
            { upsert: true, new: true }
        );

        return {
            shop: newShop,
            tokens: tokens
        }
    }

    static async signIn({ email, password, refreshToken = null }) {
        const foundShop = ShopRepository.getOneByConditions({ email });
        if (!foundShop)
            throw new BadRequestError("Invalid Shop");

        const match = bcrypt.compare(password, foundShop.password);
        if (!match)
            throw new AuthFailureError("Authen failed");

        const privateKey = generateHashString(64);
        const publicKey = generateHashString(64);

        const tokens = createTokenPairs({
            id: foundShop._id,
            email: foundShop.email
        }, publicKey, privateKey);

        await KeyRepository.create({
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken
        });

        return {
            shop: foundShop,
            tokens
        }
    }

    static async signOut({ }) {

    }


}

module.exports = ShopServices;