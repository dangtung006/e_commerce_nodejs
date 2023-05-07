const JWT = require("jsonwebtoken");

const createTokenRSAPairs = (payload, publicKey, privateKey) => {
    try {
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days"
        });

        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days"
        });

        return { accessToken, refreshToken };

    } catch (err) {
        console.log("err : ", err);
    }
}

const createTokenPairs = (payload, publicKey, privateKey) => {

    const accessToken = JWT.sign(payload, publicKey, {
        expiresIn: "2 days"
    });

    const refreshToken = JWT.sign(payload, privateKey, {
        expiresIn: "7 days"
    });

    return { accessToken, refreshToken };
}

const verifyToken = (accessToken, publicKey, cb = null) => {
    return JWT.verify(accessToken, publicKey, cb);
}

module.exports = {
    createTokenRSAPairs,
    createTokenPairs,
    verifyToken
};