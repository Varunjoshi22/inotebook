const connectToMongo = require('./db');
connectToMongo();
//syntax to connect the database with the db.js

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Varun!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
