const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: String,
    username: String, 
    email: String,
    password: String,
    jobList: Array 
});

module.exports = mongoose.model('JobBoardUser', UserSchema);