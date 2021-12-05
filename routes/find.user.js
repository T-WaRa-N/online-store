const express = require('express') //requiring express for routers
const router = express.Router()    //enabling router
const findUsers = require('../controllers/database.controller') //controller module availed

router.get('/', findUsers.findUser) // create module invoked

module.exports = router   //exporting router