"use strict" 


const express = require('express');
const router = express.Router();
const Main_controller =  require('../../controller/page_controller')
/* GET main page. */
router.get('/',Main_controller.getMainPage);

module.exports = router;
