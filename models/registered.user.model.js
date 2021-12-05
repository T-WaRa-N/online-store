const mongoose = require('mongoose') // require mongoose
const Schema = mongoose.Schema       // set Schema

// Creating a Schema for a registered user
const registeredUserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

// Model for the database
const StoreUser =mongoose.model('storeuser', registeredUserSchema)

//Exporting model
module.exports =  StoreUser