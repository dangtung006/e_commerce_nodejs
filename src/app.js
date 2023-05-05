const app = require("express")();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const AppRoutes = require("./routes");


//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(AppRoutes())

const server = app.listen(3000, () => {
    console.log("app listen on port 3000")
})

process.on("SIGINT", () => {
    server.close(() => console.log("Server Exited"));
})