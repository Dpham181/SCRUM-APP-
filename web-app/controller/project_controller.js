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
         req.session.teamid = req.body.team_id;
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
         await axios.post(gateway + "/Projects/", project);
        
         return res.redirect('/main/projects');

         
       
        
      }
      catch (error) {
        console.log('make project error')

        return res.redirect(req.get('referer'));

      }

    }
    return res.redirect('/')
  },
 
  // project details 
  getProjectdetails: async (req, res) => {
    if (req.session && req.session.Authenticated) {

      try {
      
        const projectid = xssFilters.inHTMLData(req.body.projectid); 
        req.session.projectid =  projectid; 
        
        const teamid =    req.session.teamid; 
       
        const data = {project_id: projectid,team_id:teamid }
        const project = await axios.get(gateway + "/Projects/" +  projectid);
         // project info
        const teamsproject = await axios.get(gateway + "/Projects/Teams/" +  projectid);
        // teams contributes 
        const teamproject = await axios.post(gateway + "/Projects/Team/" , data);
        const totalteams = teamsproject.data.Teamsproject.length;
        // backlogs 
        const productbacklog = await axios.get(gateway + "/Backlogs/Product/" +  projectid);
        const srpintbacklog = await axios.get(gateway + "/Backlogs/Sprint/" +  projectid);

     
     
        return res.render('main', {projectid:projectid,userprofile:req.session.userprofile,sprintbl:srpintbacklog.data.Spint_items ,productbl:productbacklog.data.Product_items, project:project.data.Project[0],totalteams:totalteams, contribute:teamproject.data.Teamproject[0], context:'project_details' });

         
       
        
      }
      catch (error) {

      }

    }
    return res.redirect('/')
  },


  addProductBL: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      console.log('here')
      try {
      
        const projectid = xssFilters.inHTMLData(req.body.projectid);       
        const des = xssFilters.inHTMLData(req.body.Description); 

        const data = {Product_id:projectid,description:des}
        await axios.post(gateway + "/Backlogs/Product/" , data);
        
     
     
        return res.redirect(307,'/project');

         
       
        
      }
      catch (error) {
        console.log('err')

      }

    }
    return res.redirect('/')
  },
  addSprintBL: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      try {
      
        const item_id = xssFilters.inHTMLData(req.body.item_id);       
        const Iteration_Number = xssFilters.inHTMLData(req.body.Iteration_Number); 
        const User_Stories = xssFilters.inHTMLData(req.body.User_Stories); 
        const data = {PItem_id:item_id,Iteration_Number:Iteration_Number,Use_Stories:User_Stories}
        await axios.post(gateway + "/Backlogs/Sprint/" , data);
        
        const projectid =  req.session.projectid;

        const teamid =    req.session.teamid; 

        const data2 = {project_id: projectid,team_id:teamid }
        const project = await axios.get(gateway + "/Projects/" +  projectid);
         // project info
        const teamsproject = await axios.get(gateway + "/Projects/Teams/" +  projectid);
        // teams contributes 
        const teamproject = await axios.post(gateway + "/Projects/Team/" , data2);
        const totalteams = teamsproject.data.Teamsproject.length;
        // backlogs 
        const productbacklog = await axios.get(gateway + "/Backlogs/Product/" +  projectid);
        const srpintbacklog = await axios.get(gateway + "/Backlogs/Sprint/" +  projectid);

     
     
        return res.render('main', {projectid:projectid,userprofile:req.session.userprofile,sprintbl:srpintbacklog.data.Spint_items ,productbl:productbacklog.data.Product_items, project:project.data.Project[0],totalteams:totalteams, contribute:teamproject.data.Teamproject[0], context:'project_details' });

         


         
       
        
      }
      catch (error) {
        console.log('err')

      }

    }
    return res.redirect('/');
  },

}
