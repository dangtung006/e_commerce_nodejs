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
const removeUndefinedObj = (obj) => {
    Object.keys(obj).forEach(k => {
        if (!obj[k]) {
            delete obj[k]
        }
    });
    return obj;
}

const updateNestedObj = (Obj) => {
    const result = {};
    Object.keys(Obj).forEach(k => {
        if (typeof Obj[k] === 'object' && !Array.isArray(Obj[k])) {
            const res = updateNestedObj(Obj[k]);
            Object.keys(res).forEach(a => {
                result[`${k}.${a}`] = res[a]
            })
        } else {
            result[k] = Obj[k]
        }
    })
    return result;
}

module.exports = {
    pickObjByKey,
    getSelectData,
    getUnselectData,
    removeUndefinedObj,
    updateNestedObj
}