"use strict" 


const express = require('express');
const router = express.Router();
const Homepage_controller =  require('../../controller/page_controller');
/* GET home page. */
router.get('/', Homepage_controller.getHomePage);

module.exports = router;
