const _ = require("lodash");

const pickObjByKey = (keys = [], obj = {}) => {
    return _.pick(obj, keys)
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]));
}

const getUnselectData = (unSelect = []) => {
    return Object.fromEntries(unSelect.map(el => [el, 0]));
}

module.exports = {
    pickObjByKey,
    getSelectData,
    getUnselectData
}