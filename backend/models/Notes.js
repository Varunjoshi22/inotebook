const mongoose = require('mongoose');//check the docs written from there


const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: date.now
    }


});

module.exports = mongoose.model('notes', NotesSchema)//exporting the module to index.js
