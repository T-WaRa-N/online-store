const express = require('express') //requiring express for routers
const router = express.Router()    //enabling router
const newUser = require('../controllers/database.controller') //controller module availed

router.post('/', newUser.create) // create module invoked

module.exports = router   //exporting router
