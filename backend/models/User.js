const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


});
const user = mongoose.model('user', UserSchema);
user.createIndexes();//this will help to check whether no duplicate entry are been used

module.exports = user; //these are all the heading of the table in which the data will be stored