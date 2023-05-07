const crypto = require("crypto");

const generateHashString = (num) => {
    return crypto.randomBytes(num).toString("hex");
}

const generateKeyPairs = () => {
    return crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: 'pem'
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: 'pem'
        }
    });
}

module.exports = {
    generateKeyPairs,
    generateHashString
}