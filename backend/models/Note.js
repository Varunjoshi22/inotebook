const mongoose = require('mongoose');//check the docs written from there
const { Schema } = mongoose;


const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,//thiss is like a foreingn key to this database to fetch the notes
        ref: 'user'
    },

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
        default: Date.now
    }


});

module.exports = mongoose.model('notes', NotesSchema)//exporting the module to index.js
