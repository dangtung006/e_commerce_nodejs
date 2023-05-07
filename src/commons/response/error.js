const STATUS_CODE = {
    'forbidden': 403,
    'conflict': 409,
    'internal': 500,
    'not_found': 404
}

const REASON_STATUS_CODE = {
    'forbidden': "Bad Request",
    'conflict': "Conflict",
    'internal': 'Internal Server Error',
    'not_found': 'Not Found'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflictRequestErrorResponse extends ErrorResponse {
    constructor(message = STATUS_CODE['conflict'], status = REASON_STATUS_CODE['conflict']) {
        super(message, status)
    }
}

class ForbidenRequestError extends ErrorResponse {
    constructor(message = STATUS_CODE['forbidden'], status = REASON_STATUS_CODE['forbidden']) {
        super(message, status)
    }
}

class InternalServerError extends ErrorResponse {
    constructor(message = STATUS_CODE['internal'], status = REASON_STATUS_CODE['internal']) {
        super(message, status)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = STATUS_CODE['not_found'], status = REASON_STATUS_CODE['not_found']) {
        super(message, status)
    }
}