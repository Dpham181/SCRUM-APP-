"use strict" 


const express = require('express');
const router = express.Router();
const Main_controller =  require('../../controller/project_controller')
/* GET main/projects page. */
router.post('/',Main_controller.getProjectContext);

module.exports = router;
