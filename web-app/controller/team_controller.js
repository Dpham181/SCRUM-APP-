"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");
const popup_msg = require('alert');
const notifier = require('node-notifier');
const gateway = require("../bin/Gateway");
const team = require("../model/team");
module.exports = {

   // display user's teams
   
   ShowTeams:  async (req, res) => {
   
    try {

   // teams 
   return res.render('main', {userprofile: req.session.userprofile,teams:  req.session.teams, context:'teams_context'});
   

    } catch (error) {
     
        return res.redirect(req.get('referer'));

    }

  },
  //create new team 

  CreateTeam:  async (req, res) => {
   
    const userid = req.session.Authenticated;
    
    try {
      const NewTeam = Object.create(team);
      NewTeam.User_id = userid;
      NewTeam.TeamName = xssFilters.inHTMLData(req.body.TeamName);
      NewTeam.Size = xssFilters.inHTMLData(req.body.Size);
      console.log(NewTeam)

      await axios.post(gateway+"/Teams/",NewTeam);
    
      return res.redirect(req.get('referer'));


    } catch (error) {
     
      return res.redirect(req.get('referer'));

    }

  },

  ViewMembers:  async (req, res) => {
   
    
    try {
    

     const Teamid = xssFilters.inHTMLData(req.body.teamid);
     const reponse = await axios.post(gateway+"/Members",{'Team_id':Teamid});
     console.log(reponse.data)


     // check role before display
      return res.redirect(req.get('referer'));


    } catch (error) {
     
      return res.redirect(req.get('referer'));

    }

  },

}
