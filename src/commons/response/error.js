const {
    StatusCodes,
    ReasonPhrases
} = require("../../commons/const/http/index");

class BaseErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestErrorResponse extends BaseErrorResponse {
    constructor(message = ReasonPhrases.CONFLICT, status = StatusCodes.CONFLICT) {
        super(message, status)
    }
}

class ForbidenRequestError extends BaseErrorResponse {
    constructor(message = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN) {
        super(message, status)
    }
}

class BadRequestError extends BaseErrorResponse {
    constructor(message = ReasonPhrases.BAD_REQUEST, status = StatusCodes.BAD_REQUEST) {
        super(message, status)
    }
}

class InternalServerError extends BaseErrorResponse {
    constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR, status = StatusCodes.INTERNAL_SERVER_ERROR) {
        super(message, status)
    }
}

class NotFoundError extends BaseErrorResponse {
    constructor(message = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND) {
        super(message, status)
    }
}

class AuthFailureError extends BaseErrorResponse {
    constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
        super(message, status)
    }
}

module.exports = {
    ConflictRequestErrorResponse,
    ForbidenRequestError,
    BadRequestError,
    InternalServerError,
    NotFoundError,
    AuthFailureError
}