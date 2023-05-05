const app = require("express")();

const server = app.listen(3000, () => {
    console.log("app listen on port 3000")
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server Exited")
    })
})