const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose');

//DB connection string
const dbconn = "mongodb://127.0.0.1:27017/eventsdb"

mongoose.connect(dbconn, err => {
    if(err) {
        console.error('Error! ' + err);
    } else {
        console.log('Connected to mongodb');
    }
})

router.get('/', (req, res) =>{
    res.send('From API route');
})

router.post('/register', (req, res) => {
    //get the post body
    let userData = req.body;
    //create a new use object from the post body
    let user = new User(userData);
    //save the new user to mongodb
    //callback gets error and the saved user as parameters
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser);
        }
    });
})

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.error(error);
        } else {
            if(!user) {
                res.status(401).send("Invalid email");
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send("Invalid password");
                } else {
                    res.status(200).send(user);
                }
            }
        }
    });

})

module.exports = router;
