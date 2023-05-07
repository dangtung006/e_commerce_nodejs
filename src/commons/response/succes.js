const STATUS_CODE = {
    'ok': 200,
    'created': 201
}

const REASON_STATUS_CODE = {
    'ok': "Success",
    'created': "Created"
}

class BaseResponse {
    constructor({
        message,
        statusCode = STATUS_CODE['ok'],
        reasonStatusCode = REASON_STATUS_CODE['ok'],
        metaData = {}
    }) {
        this.message = message ? message : reasonStatusCode;
        this.status = statusCode;
        this.metaData = metaData

    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class SuccessRespone extends BaseResponse {
    constructor({ message, metaData, opt }) {
        super({
            message, metaData
        })
        this.opt = opt;
    }
}

class CreatedRespone extends BaseResponse {
    constructor({
        message,
        statusCode = STATUS_CODE['created'],
        reasonStatusCode = REASON_STATUS_CODE['created'],
        metaData = {},
        opt
    }) {
        super({
            message,
            statusCode,
            reasonStatusCode,
            metaData
        });

        this.opt = opt;
    }
}

module.exports = {
    SuccessRespone,
    CreatedRespone
}