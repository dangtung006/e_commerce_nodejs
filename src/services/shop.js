const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ShopRepository = require("../repositories/shop");
const KeyRepository = require("../repositories/key_token");
const { createTokenPairs } = require("../helpers/auth");
const { generateHashString } = require("../helpers/crypto");
const {
    BadRequestError,
    InternalServerError,
} = require("../commons/response/error")

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
            // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: "pkcs1",
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: "pkcs1",
            //         format: 'pem'
            //     }
            // });

            // const RsaKeys = await KeyRepository.create({
            //     user: shop._id,
            //     publicKey: publicKey.toString()
            // });
            // const publicKeyObj = crypto.createPublicKey(keys.publicKey);

            const privateKey = crypto.getRandomValues(64).toString("hex");
            const publicKey = crypto.getRandomValues(64).toString("hex");

            var keyStore = await KeyRepository.create({
                user: shop._id,
                publicKey,
                privateKey
            });

            if (!keyStore) return console.log("key stores err");

            const tokens = createTokenPairs({
                id: shop._id,
                email: shop.email
            }, publicKey, privateKey);

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

    static async signIn({ email, password, refreshToken = null }) {
        const foundShop = ShopRepository.getOneByConditions({ email });
        if (!foundShop)
            throw new BadRequestError("Invalid Shop");

        const match = bcrypt.compare(password, foundShop.password);
        if (!match)
            throw new BadRequestError("Authen failed");

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


}

module.exports = ShopServices;