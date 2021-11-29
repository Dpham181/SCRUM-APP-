"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");
const popup_msg = require('alert');
const notifier = require('node-notifier');
const gateway = require("../bin/Gateway");
const team = require("../model/team");
module.exports = {

  // display project that already in process with a team 
  getProjectPage:  async(req, res) => {
    if (req.session && req.session.Authenticated) {
      const userid = req.session.Authenticated;
    try{
      // team with exiting projects
        const myteams = await axios.get(gateway + "/Teams/"+ userid + "/");
        req.session.Teams = myteams.data.Teams
      // team without projects
        const allteams = await axios.get(gateway + "/Teams/"+ userid );
        var team_withoutproject = allteams.data.Teams.filter(function(objOne) {
          return !myteams.data.Teams.some(function(objTwo) {
              return objOne.Team_id === objTwo.Team_id;
          });
      });

      req.session.team_withoutproject = team_withoutproject; 
        return res.render('main', {userprofile:req.session.userprofile,team_withoutproject: req.session.team_withoutproject,teams:  myteams.data.Teams, context:'projects_context', Projects:null});

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
        
         return res.render('main', {userprofile:req.session.userprofile,team_withoutproject:req.session.team_withoutproject,teams:req.session.Teams , context:'projects_context', Projects:myprojects.data.Projects});

         
       
        
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
      
        const teamid = xssFilters.inHTMLData(req.body.team_id);
        const Title = xssFilters.inHTMLData(req.body.Title);
        const description = xssFilters.inHTMLData(req.body.Description);
        const deathline = xssFilters.inHTMLData(req.body.date);
 
         const project = {'Teamid':teamid, 'Title':Title, 'description':description, 'deathline':deathline}
          const myprojects = await axios.post(gateway + "/Projects/", project);
        
         return res.redirect('/main/projects');

         
       
        
      }
      catch (error) {
        console.log('make project error')

        return res.redirect(req.get('referer'));

      }

    }
    return res.redirect('/')
  },
 


}
