const {
    SuccessResponse,
    CreatedResponse
} = require("../commons/response/success");

const ShopService = require("../services/shop");

const signUp = async (req, res, next) => {
    return new CreatedResponse({
        message: "SignUp Success!",
        metaData: await ShopService.signUp(req.body)
    }).send(res);
}

const signIn = async (req, res, next) => {
    return new SuccessResponse({
        message: "SignIn Success!",
        metaData: await ShopService.signIn(req.body)
    }).send(res);
}

const signOut = async (req, res, next) => {
    return new SuccessResponse({
        message: "Logout Success!",
        metaData: await ShopService.signOut(req.keyStore)
    }).send(res);
}


module.exports = {
    signUp,
    signIn,
    signOut
}