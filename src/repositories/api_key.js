const BaseRepository = require("./base");
const ApiKeyModel = require("../models/api_key.model");

class ApiKeyRepository extends BaseRepository {
    constructor(opt) {
        super({
            entity: ApiKeyModel
        })
    }
}

module.exports = new ApiKeyRepository()