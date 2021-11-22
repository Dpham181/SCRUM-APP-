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
        req.session.userprofile = userprofile[0]
        // teams 
        const myteams = await axios.get(gateway + "/Teams/"+ userid);
        req.session.teams = myteams.data.Teams
        return res.render('main', {userprofile:userprofile[0],teams: myteams.data.Teams, context:'main_context'});
        
      }
      catch (error) {
  
      }

    }
    return res.redirect('/')
  },
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
