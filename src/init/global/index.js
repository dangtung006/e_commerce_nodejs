require("dotenv").config();
const configs = require("../../configs/index");

const initGlobal = () => {
    global.configs = configs;

    return {
        configs: global.configs
    }
}

module.exports = {
    initGlobal
}