class BaseRepository {
    _Entity = null;
    select = {};
    join = {};
    session = {};
    sort = {};
    paging = { offset: 0, limit: 10 };

    defaultOpt = {
        offset: this.paging["offset"],
        limit: this.paging["limit"],
        sort: this.sort
    }

    constructor(opt) {
        this._Entity = opt && opt.entity ? opt.entity : null;
    }

    getById(id) {
        return this._Entity.findById(id);
    }

    getAll(opt = this.defaultOpt) {
        var sort = opt && opt.sort ? opt.sort : this.sort;
        return this._Entity.find().sort(sort).limit(10000);
    }

    getList(opt = this.defaultOpt) {
        var offset = opt && opt.offset ? opt.offset : this.paging['offset'];
        var limit = opt && opt.limit ? opt.limit : this.paging['limit'];
        var sort = opt && opt.sort ? opt.sort : this.sort;

        return this._Entity.find().skip(offset).sort(sort).limit(limit);
    }

    getOneByConditions(condition) {
        return this._Entity.findOne(condition)
    }

    getListByConditions(condition, opt = this.defaultOpt) {
        var offset = opt && opt.offset ? opt.offset : this.paging['offset'];
        var limit = opt && opt.limit ? opt.limit : this.paging['limit'];
        var sort = opt && opt.sort ? opt.sort : this.sort;

        return this._Entity.find(condition).skip(offset).limit(limit).sort(sort);
    }

    create(opt) {
        return this._Entity.create(opt);
    }

    updateOne({ filter, data, opt }) {
        return this._Entity.findOneAndUpdate(filter, data, opt);
    }

}

module.exports = BaseRepository