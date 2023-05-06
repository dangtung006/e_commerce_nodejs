const ShopRepository = require("../repositories/shop");
const bcrypt = require("bcrypt");

class ShopServices {

    static async signUp({ name, email, password }) {
        var shop = await ShopRepository.getOneByConditions({ email: email }).lean();

        if (shop) return console.log("shop existed");
        shop = await ShopRepository.create({
            name, email, password, roles: []
        })

        return shop;
    }

    static async login() {

    }


}

module.exports = ShopServices;