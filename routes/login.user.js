const express = require('express') //requiring express for routers
const router = express.Router()    //enabling router
const existingUser = require('../controllers/database.controller') //controller module availed

router.post('/', existingUser.logged) // login module invoked

module.exports = router   //exporting router
