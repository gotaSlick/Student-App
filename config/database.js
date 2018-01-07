var mongoose = require("mongoose");
var keys = require("./keys");

module.exports = {
    //with backtics:
    database: `mongodb://${keys.username}:${keys.password}@ds121965.mlab.com:21965/student_elium`,
    //with double quotes:
    // database: "mongodb://" + keys.username + ":" + keys.username + "@ds121965.mlab.com:21965/student_elium"
    startDb: function(){
        // to get rid of an annoying warning:
        mongoose.Promise = global.Promise;
        //opens connection with 2 arguments:
        mongoose.connect(this.database, { useMongoClient: true });
        db = mongoose.connection;

        db.once("open", () => {
            console.log("Connected to Mongo DB");
        });
        db.on("error", error => {
            console.log(error);
        });
    }
};