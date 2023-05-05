const mongoose = require("mongoose");

class MyDB {

    constructor() {
        this.connect();
    }

    async connect(type = "mongodb") {
        try {
            await mongoose.connect("mongodb://127.0.0.1:27017/myshop?retryWrites=true&w=majority");
            console.log("connect success");
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