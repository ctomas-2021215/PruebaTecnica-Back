'use strict'
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    }
    ,
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    age: {
        type: Number,
        require: true,
    }
    ,
    role: {
        type: String,
        uppercase: true,
        default: 'ADMIND'
    },

}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)