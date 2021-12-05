//Introducing Express 
const express = require('express') 
const app =express()

//enable connection to the mongoDB database with accompanying functionalities
const mongoose = require('mongoose')

//enable some level of security
const helmet = require('helmet')

//enabling some navigations with in the app 
const bodyParser = require('body-parser')

//quick application of some middleware in server
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

//dynamically rendering the port??
const PORT = process.env.PORT || 3001

// Setting the point of reference for connecting to mongoDB
const dataBase = "mongodb+srv://T-WaRa-N:5fDhcojzT08iL9Sd@hyperiondev01-t-wara-n.wdnxe.mongodb.net/HyperionDev01-T-WaRa-N?retryWrites=true&w=majority"

//Connecting the server to mongoDB database
mongoose.connect(dataBase, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(()=>{
    console.log("Successfully connected to the database...")

    // app listening on port PORT
    app.listen(PORT, function(){
    console.log(`Currently listning on port ${PORT}`)
    })
 })
 .catch((error)=>{
    console.log(`The server could not connect to the database because of error: ${error}`)
})

// importing routing from the router directory
const signUp = require('./routes/signup.user')
const logged  = require('./routes/login.user')
const products = require('./routes/online.products')
const findUsers = require('./routes/find.user')
 
// app.use application for incoming routing
app.use('/signUp', signUp)
app.use('/logged', logged)
app.use('/onlineProducts', products)
app.use('/users', findUsers)



