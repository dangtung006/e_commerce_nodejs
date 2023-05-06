const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

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
module.exports = {
    apiKey,
    permission
}