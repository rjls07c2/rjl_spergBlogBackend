const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email_Address: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        required: true,
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)