const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    comment: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Post', PostSchema);