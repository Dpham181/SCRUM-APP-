"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");
const popup_msg = require('alert');
const notifier = require('node-notifier');
const gateway = require("../bin/Gateway");
const team = require("../model/team");
module.exports = {


  getProjectPage:  (req, res) => {
    if (req.session && req.session.Authenticated) {
      
        return res.render('main', {userprofile:req.session.userprofile,teams:  req.session.teams, context:'projects_context', Projects:null});
        
    
    }
    return res.redirect('/')
  },
 
  getProjectContext: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      try {
      
        
         const data = {'id':req.body.team_id}
         const myprojects = await axios.post(gateway + "/Projects", data);
        
        console.log(myprojects.data.Projects)
         return res.render('main', {userprofile:req.session.userprofile,teams:  req.session.teams, context:'projects_context', Projects:myprojects.data.Projects});

         
       
        
      }
      catch (error) {
        return res.redirect(req.get('referer'));

      }

    }
    return res.redirect('/')
  },
 
  



}
