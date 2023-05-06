const JWT = require("jsonwebtoken");

const createTokenPairs = (payload, privateKey, publicKey) => {
    try {
        const accessToken = JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days"
        });

        const refreshToken = JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days"
        });

        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log("err verify : ", err);
            }
            console.log("decode : ", decode);
        });

        return { accessToken, refreshToken };

    } catch (err) {
        console.log("err : ", err);
    }
}

module.exports = {
    createTokenPairs
};