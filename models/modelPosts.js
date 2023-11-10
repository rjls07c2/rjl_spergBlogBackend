const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    writer: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    cats: {
        required: true,
        type: String
    },
    text: {
        required: true,
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Posts', postSchema)