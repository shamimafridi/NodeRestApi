var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
//expressPaginate = require('express-paginate');

var Schema = mongoose.Schema;
var userSchema = new Schema({
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
});
userSchema.plugin(mongoosePaginate);

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', userSchema);