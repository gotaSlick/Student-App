var mongoose = require("mongoose");

var studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true // means that it cannot be empty
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String
    },
    country: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now() // when a new user is created, it gives the timestamp for it
    }
});

var Student = mongoose.model("Student", studentSchema);

module.exports = Student;