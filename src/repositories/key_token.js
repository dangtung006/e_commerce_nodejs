const BaseRepository = require("./base");
const KeyModel = require("../models/key_tokens.model");

class KeyRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: KeyModel
        })
    }
}

module.exports = new KeyRepository()