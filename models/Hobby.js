const mongoose = require('mongoose');

const HobbySchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Hobby', HobbySchema);