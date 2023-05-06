class BaseRepository {
    _Entity = null;

    constructor(opt) {
        this._Entity = opt && opt.entity ? opt.entity : null
    }

    getById(id) {
        return this._Entity.findById(id)
    }

    getAll()

    getList()

    getOne()

    getByCondition()

}

module.exports = BaseRepository