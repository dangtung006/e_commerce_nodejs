const dev = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'SHOP_DEV'
    }
}

const pro = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'SHOP_PRO'
    }
}

module.exports = {
    dev, pro
}