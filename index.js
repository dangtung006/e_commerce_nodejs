const MyDB = require("./src/init/dbs/init.database");
async function main() {
    try {
        const dbInstance = MyDB.getInstance();
        if (dbInstance) {
            //init app when connect db successfully;
            require("./src/app.js");
        }
    } catch (err) {
        console.log("err")
    }
}

main();