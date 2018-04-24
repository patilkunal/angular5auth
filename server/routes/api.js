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

router.get("/events", (req, res) => {
    let events = [
        {
            "_id": "1",
            "name" : "Auto Expo 1",
            "description" : "Auto Expo Desc",
            "date": "2018-04-01T10:10:01.43.511Z"
        },
        {
            "_id": "2",
            "name" : "Auto Expo 2",
            "description" : "Auto Expo Desc 22",
            "date": "2018-04-01T10:10:02.43.512Z"
        },
        {
            "_id": "3",
            "name" : "Auto Expo 3",
            "description" : "Auto Expo Desc 33",
            "date": "2018-04-01T10:10:03.43.512Z"
        },
        {
            "_id": "4",
            "name" : "Auto Expo 4",
            "description" : "Auto Expo Desc 4",
            "date": "2018-04-01T10:10:04.43.512Z"
        }
        
    ];
    res.json(events);
})

router.get("/special", (req, res) => {
    let events = [
        {
            "_id": "1",
            "name" : "Special Expo 1",
            "description" : "Special Expo Desc",
            "date": "2018-04-01T10:10:01.43.511Z"
        },
        {
            "_id": "2",
            "name" : "Special Expo 2",
            "description" : "Special Expo Desc 22",
            "date": "2018-04-01T10:10:02.43.512Z"
        },
        {
            "_id": "3",
            "name" : "Special Expo 3",
            "description" : "Special Expo Desc 33",
            "date": "2018-04-01T10:10:03.43.512Z"
        },
        {
            "_id": "4",
            "name" : "Special Expo 4",
            "description" : "Special Expo Desc 4",
            "date": "2018-04-01T10:10:04.43.512Z"
        }
        
    ];
    res.json(events);
})
module.exports = router;
