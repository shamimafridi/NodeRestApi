var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    roles: [{
        name: String,
        allow: Boolean,
        deny: Boolean
    }]
}));