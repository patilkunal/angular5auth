const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email:String,
    password:String,
    name: String
})

//defines 'user' model with schema defined above and would connect to 'users' collection on MongoDB
module.exports = mongoose.model('user', userSchema, 'users');