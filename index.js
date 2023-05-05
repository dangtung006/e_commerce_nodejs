require("dotenv").config();
const MyDB = require("./src/init/dbs/init.database");
const { checkOverLoad } = require("./src/helpers/health")
async function main() {
    try {
        const dbInstance = MyDB.getInstance();
        if (dbInstance) {
            //init app when connect db successfully;
            require("./src/app.js");
        }

        IDInterval = checkOverLoad();

        process.on("SIGINT", () => {
            clearInterval(IDInterval);
            process.exit(1);
        })

    } catch (err) {
        console.log("err")
    }
}

main();