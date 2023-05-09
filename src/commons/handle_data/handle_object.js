const _ = require("lodash");

const pickObjByKey = (keys = [], obj = {}) => {
    return _.pick(obj, keys)
}

module.exports = {
    pickObjByKey
}