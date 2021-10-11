"use strict" 


const express = require('express');
const router = express.Router();
const main_controller =  require('../controller/main_controller')

router.post('/', main_controller.CreateTeam);

module.exports = router;
