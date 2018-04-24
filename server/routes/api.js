const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');

//DB connection string
const dbconn = "mongodb://127.0.0.1:27017/eventsdb"

mongoose.connect(dbconn, err => {
    if(err) {
        console.error('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
})

router.get('/', (req, res) =>{
    res.send('From API route');
})

module.exports = router;
