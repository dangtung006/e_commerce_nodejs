const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const AppRoutes = require("./routes");
const { errorHandler } = require("../src/middlewares/request")


//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(AppRoutes())
app.use(errorHandler)

const server = app.listen(3000, () => {
    console.log("app listen on port 3000")
})

process.on("SIGINT", () => {
    server.close(() => console.log("Server Exited"));
})