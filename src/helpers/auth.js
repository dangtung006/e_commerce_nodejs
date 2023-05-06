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

        // JWT.verify(accessToken, publicKey, (err, decode) => {
        //     if (err) {
        //         console.log("err verify : ", err);
        //     }
        //     console.log("decode : ", decode);
        // });

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

module.exports = {
    createTokenRSAPairs,
    createTokenPairs
};