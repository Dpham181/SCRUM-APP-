"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");
const popup_msg = require('alert');
const notifier = require('node-notifier');
const gateway = require("../bin/Gateway");
const team = require("../model/team");
module.exports = {


  // main page
  getMainPage: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      const userid = req.session.Authenticated;
      try {
        // profile 
        const reponse = await axios.get(gateway + "/Users/Profile", {params:{id:userid}});
        const userprofile = reponse.data.Profile
        // teams 
        const url = require('url')
          const pathurl = req.originalUrl;
        console.log(pathurl.hash) // #some/u
        const myteams = await axios.get(gateway + "/Teams/"+ userid);
      
        return res.render('main', {userprofile:userprofile[0],teams: myteams.data.Teams, context:'main_context'});
        
      }
      catch (error) {
  
      }

    }
    return res.redirect('/')
  },
  getProjectPage: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      const userid = req.session.Authenticated;
      try {
        // profile 
        const reponse = await axios.get(gateway + "/Users/Profile", {params:{id:userid}});
        const userprofile = reponse.data.Profile
        // teams 
       
        const myteams = await axios.get(gateway + "/Teams/"+ userid);
        // project query 
        //todo
        return res.render('main', {userprofile:userprofile[0],teams: myteams.data.Teams, context:'projects_context'});
        
      }
      catch (error) {
  
      }

    }
    return res.redirect('/')
  },
 

  //create new team 

  CreateTeam:  async (req, res) => {
   
    const userid = req.session.Authenticated;
    
    try {
      const NewTeam = Object.create(team);
      console.log(NewTeam)
      NewTeam.User_id = userid;
      NewTeam.TeamName = xssFilters.inHTMLData(req.body.TeamName);
      NewTeam.Size = xssFilters.inHTMLData(req.body.Size);
      await axios.post(gateway+"/Teams/",NewTeam);
    
      return res.redirect(req.get('referer'));


    } catch (error) {
     
      return res.redirect(req.get('referer'));

    }

  },



}
