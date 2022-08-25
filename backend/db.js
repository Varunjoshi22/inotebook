const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/?directConnection=true"
// make two constant and then make a function and execute the two constant and then export that function to the main index.js 

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to mongoose")
    })
}

module.exports = connectToMongo;
// syntax to connect the database to the index.js