const mongoose = require('mongoose');

const JobItemSchema = new mongoose.Schema({
    id: String,
    userId: String,
    currentNumber: Number,
    title: String,
    companyName: String,
    interview: Boolean,
    offer: Boolean,
    details: String,
    jobLink: String
});

const JobItem = new mongoose.model('JobItem', JobItemSchema);

module.exports = JobItem;