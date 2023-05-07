const crypto = require("crypto");

const generateHashString = (num) => {
    return crypto.randomBytes(num).toString("hex");
}

module.exports = {
    generateHashString
}