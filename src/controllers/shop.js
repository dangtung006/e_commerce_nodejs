const ShopService = require("../services/shop");

const signUp = async (req, res, next) => {
    try {
        return res.json(await ShopService.signUp(req.body))
    } catch (err) {
        console.log("err : ", err);
        next(err);
    }
}

module.exports = {
    signUp
}