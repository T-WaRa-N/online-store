const mongoose = require('mongoose') // require mongoose
const Schema = mongoose.Schema       // set Schema

// Creating a Schema for a registered user
const productSchema = new Schema({
    imageUrl:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    type:{
        type: String,
        require: true
    }
})

// Model for the database
const StoreProduct = mongoose.model('onlineproduct', productSchema)

//Exporting the model
module.exports =  StoreProduct