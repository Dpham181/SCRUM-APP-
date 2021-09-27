"use strict" 


const express = require('express');
const router = express.Router();
const Homepage_controller =  require('../controller/authentication')

router.post('/SignIn/', Homepage_controller.SignIn);

module.exports = router;
