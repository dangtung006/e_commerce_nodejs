class BaseRepository {
    _Entity = null;

    constructor(opt) {
        this._Entity = opt && opt.entity ? opt.entity : null
    }

    getById(id) {
        return this._Entity.findById(id)
    }

    getAll() {
        return this._Entity.find()
    }

    getList() {
        return this._Entity.find().skip().limit()
    }

    getOneByConditions(condition) {
        return this._Entity.findOne(condition)
    }

    getListByConditions(condition) {
        return this._Entity.findOne(condition).skip().limit()
    }

}

module.exports = BaseRepository