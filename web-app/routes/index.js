"use strict" 


const express = require('express');
const router = express.Router();
const Homepage_controller =  require('../controller/authentication')
/* GET home page. */
router.get('/', Homepage_controller.getHomePage);

module.exports = router;
