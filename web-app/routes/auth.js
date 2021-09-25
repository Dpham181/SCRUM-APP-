"use strict" 


const express = require('express');
const router = express.Router();
const Homepage_controller =  require('../controller/authentication')
/* GET home page. */
router.post('/auth/', Homepage_controller.);

module.exports = router;
