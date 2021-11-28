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
    if(!req.session.Authenticated)
    {
      return res.redirect('/');

    }
    const userid = req.session.Authenticated;

    try {
      const myteams = await axios.get(gateway + "/Teams/"+ userid);
      req.session.teams = myteams.data.Teams
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
   
    if(!req.session.userprofile){
      return res.redirect('/');
    }
    try {
    
    
     const Teamid = xssFilters.inHTMLData(req.body.teamid);
     const reponse = await axios.post(gateway+"/Members",{'Team_id':Teamid});
    const members = reponse.data.Members;

    let members_profile = [];
  for (let i = 0 ; i < members.length ; i++){


    const reponse_member = await axios.get(gateway + "/Users/Profile", {params:{id:members[i].MUser_id}});
    const member_profile = reponse_member.data.Profile;

    members_profile.push(member_profile[0]);
  }

   console.log(members_profile)
     return res.render('main', {userprofile: req.session.userprofile,teams:req.session.teams,Members:members,member_background:members_profile,context:'members_context'});


    } catch (error) {
     
      return res.redirect('/');

    }

  },

}

