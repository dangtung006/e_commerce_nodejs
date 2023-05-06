const ShopRepository = require("../repositories/shop");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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

        console.log(privateKey, publicKey);
    }

    static async login() {

    }


}

module.exports = ShopServices;