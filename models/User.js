const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    name: {
        type: String,    
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }
});

exports = mongoose.model('User', model);