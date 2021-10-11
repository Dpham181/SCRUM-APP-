"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");

const gateway = require("../bin/Gateway");

module.exports = {


  // main page
  getMainPage: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      const userid = req.session.Authenticated;
      try {
        // profile 
        const reponse = await axios.get(gateway + "/Users/Profile", {params:{id:userid}});
        const userprofile = reponse.data.Profile
        console.log(userprofile[0])
        // teams 

        const myteams = await axios.get(gateway + "/Teams/"+ userid);
        console.log(myteams.data.Teams)

        return res.render('main', {userprofile:userprofile[0],teams: myteams.data.Teams});
        
      }
      catch (error) {
  
      }

    }
    return res.redirect('/')
  },



  //create new team 

  CreateTeam:  (req, res) => {
    console.log('test')
    return res.redirect('/')
    /*
    try {
     const TeamName = xssFilters.inHTMLData(req.body.TeamName);
      const Size = xssFilters.inHTMLData(req.body.Size);
      const NewTeam = {'User_id':userid, 'TeamName':TeamName, 'Size':Size};
      await axios(gateway+"/Teams/",NewTeam);
    } catch (error) {
      console.log(error)
    }
*/
  },



}
