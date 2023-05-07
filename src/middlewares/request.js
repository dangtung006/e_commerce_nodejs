const wrapperAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message
    })
}

module.exports = {
    wrapperAsync,
    errorHandler
}
