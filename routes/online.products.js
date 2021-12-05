const express = require('express') //requiring express for routers
const router = express.Router()    //enabling router
const fetchProducts = require('../controllers/database.controller') //controller module availed

router.get('/', fetchProducts.findOnlineProducts) // create module invoked

module.exports = router   //exporting router
