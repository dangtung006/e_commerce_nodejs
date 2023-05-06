const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER['API_KEY']]?.toString();
        if (!key) return res.status(403).json({
            message: "Forbiden Error"
        });

        return next();
    } catch (err) {
        console.error(err)
    }
}