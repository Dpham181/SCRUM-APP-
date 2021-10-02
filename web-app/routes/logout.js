"use strict" 


const express = require('express');
const router = express.Router();
const Homepage_controller =  require('../controller/authentication')

router.get('/', Homepage_controller.Logout);

module.exports = router;
