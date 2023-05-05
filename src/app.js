const app = require("express")();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");


//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

const server = app.listen(3000, () => {
    console.log("app listen on port 3000")
})

process.on("SIGINT", () => {
    // server.close(() => {
    //     // console.log("Server Exited")
    // })
})