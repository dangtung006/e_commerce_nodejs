const MyDB = require("./src/init/dbs/init.database");
const { checkOverLoad } = require("./src/helpers/health");
const { initGlobal } = require("./src/init/global/index");

async function main() {
    try {
        initGlobal();
        const dbInstance = MyDB.getInstance();

        if (dbInstance) {
            //init app when connect db successfully;
            require("./src/app.js");
        }

        // IDInterval = checkOverLoad();

        process.on("SIGINT", () => {
            //clearInterval(IDInterval);
            process.exit(1);
        })

    } catch (err) {
        console.log("err", err)
    }
}

main();