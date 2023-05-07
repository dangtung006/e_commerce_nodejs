const {
    wrapperAsync
} = require("./request");

const {
    AuthFailureError,
    NotFoundError
} = require("../commons/response/error");

const {
    Header
} = require("../commons/const/http");

const {
    verifyToken
} = require("../helpers/auth")

const TokenKeyRepository = require("../repositories/key_token");
const ApiKeyRepository = require("../repositories/api_key");

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER['API_KEY']]?.toString();
        if (!key) return res.status(403).json({
            message: "Forbiden Error"
        });

        const apiKeyObj = await ApiKeyRepository.getOneByConditions({ key });
        if (!apiKeyObj) return res.status(403).json({
            message: "Forbiden Error"
        });
        req.apiKeyObj = apiKeyObj;
        return next();
    } catch (err) {
        console.error(err)
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.apiKeyObj.permissions) return res.status(403).json({
            message: "Permission Debied"
        });

        if (!req.apiKeyObj.permissions.includes(permission)) return res.status(403).json({
            message: "Permission Debied"
        });

        return next();
    }
}

const authentication = wrapperAsync(async (req, res, next) => {
    const userId = req.headers[Header.CLIENT_ID];
    if (!userId)
        throw new AuthFailureError("Invalid Request");

    const keyStore = await TokenKeyRepository.getByUserId(userId);
    if (!keyStore)
        throw new NotFoundError("Not Found Key stores");

    const accessToken = req.headers[Header.AUTHORIZATION];
    if (!accessToken)
        throw new AuthFailureError("Invalid Token");

    verifyToken(accessToken, keyStore, (err, decode) => {
        if (err)
            throw err;
        if (userId != decode.userId)
            throw new AuthFailureError("Invalid user");

        req.keyStore = keyStore;
        return next();
    });

});

module.exports = {
    apiKey,
    permission,
    authentication
}