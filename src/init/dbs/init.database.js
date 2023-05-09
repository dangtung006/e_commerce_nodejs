const mongoose = require("mongoose");
const configs = require("../../configs/index");
class MyDB {

    constructor() {
        this.connect();
    }

    async connect(type = "mongodb") {
        const dbHost = configs["dev"]['db'].host;
        const dbPort = configs["dev"]['db'].port;
        const dbName = configs["dev"]['db'].name;

        try {
            await mongoose.connect(
                `mongodb://${dbHost}:${dbPort}/${dbName}?retryWrites=true&w=majority`,
                { maxPoolSize: 50 }
            );
        } catch (err) {
            console.log(err)
            console.log("connect err")
        }
    }

    static getInstance() {
        if (!MyDB.instance) {
            MyDB.instance = new MyDB();
        }

        return MyDB.instance;
    }
}

module.exports = MyDB