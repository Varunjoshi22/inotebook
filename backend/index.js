const connectToMongo = require('./db');
connectToMongo();
//syntax to connect the database with the db.js

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())//this is the middle ware to use the request in the auth.js

//Available routes
app.use('/api/auth', require('./routes/auth'))//require has the location of that file in which it has to load
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
