"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");
const popup_msg = require('alert');
const notifier = require('node-notifier');
const gateway = require("../bin/Gateway");
const team = require("../model/team");
module.exports = {

  // display project component 
  getProjectPage:  async(req, res) => {
    if (req.session && req.session.Authenticated) {
      const userid = req.session.Authenticated;
    try{
        const myteams = await axios.get(gateway + "/Teams/"+ userid);
        req.session.Teams = myteams.data.Teams
        return res.render('main', {userprofile:req.session.userprofile,teams:  myteams.data.Teams, context:'projects_context', Projects:null});

    }catch (error){
      return res.render('main', {userprofile:req.session.userprofile,teams:null, context:'projects_context', Projects:null});

    }
        
    
    }
    return res.redirect('/')
  },
  // choose to display project for each user's team
  getProjectContext: async (req, res) => {
    if (req.session && req.session.Authenticated) {

      try {
      
         const data = {'id':req.body.team_id}
         const myprojects = await axios.post(gateway + "/Projects", data);
        
         return res.render('main', {userprofile:req.session.userprofile,teams:req.session.Teams , context:'projects_context', Projects:myprojects.data.Projects});

         
       
        
      }
      catch (error) {
        return res.redirect(req.get('referer'));

      }

    }
    return res.redirect('/')
  },
 
  // make new project from exiting team
  
  MakeProject: async (req, res) => {
    if (req.session && req.session.Authenticated) {

      try {
      
         const data = {'id':req.body.team_id}
         const myprojects = await axios.post(gateway + "/Projects", data);
        
         return res.render('main', {userprofile:req.session.userprofile,teams:req.session.Teams , context:'projects_context', Projects:myprojects.data.Projects});

         
       
        
      }
      catch (error) {
        return res.redirect(req.get('referer'));

      }

    }
    return res.redirect('/')
  },
 


}
