const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _sec = 5000;

const countDBConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log("num of connection : : ", numConnection);
}

const checkOverLoad = () => {
    return setInterval(() => {
        const numCores = os.cpus().length;
        const maxConn = numCores * 5;
        const memoryUsage = process.memoryUsage().rss;
        console.log(`Memeory usage :: ${memoryUsage / 1024 / 1024} MB`);
        console.log("connect active : ", mongoose.connections.length);
        if (mongoose.connection.length > maxConn) {
            console.log("connection overload")
        }
    }, _sec);
}

module.exports = {
    countDBConnect,
    checkOverLoad
}