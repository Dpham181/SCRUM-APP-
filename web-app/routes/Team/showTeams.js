"use strict" 


const express = require('express');
const router = express.Router();
const main_controller =  require('../../controller/team_controller')

router.get('/', main_controller.ShowTeams);

module.exports = router;
