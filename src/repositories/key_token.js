const BaseRepository = require("./base");
const KeyModel = require("../models/key_tokens.model");
const { Types } = require("mongoose");

class KeyRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: KeyModel
        })
    }

    getByUserId(userId) {
        return this._Entity.findOne({ user: new Types.ObjectId(userId) }).lean();
    }

    removeById(id) {
        return this._Entity.findByIdAndRemove({ _id: id });
    }

    removeByUserId(userId) {
        return this._Entity.deleteOne({ user: new Types.ObjectId(userId) }).lean();
    }
}

module.exports = new KeyRepository()