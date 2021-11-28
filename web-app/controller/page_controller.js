"use strict"


const axios = require("axios");
const gateway = require("../bin/Gateway");
const user_info = require("../model/user");

module.exports = {


  // home page
  getHomePage: (req, res) => {

    res.render('index', { title: 'Welcome to Scrum App', error:'' });

  },

  // main page

  getMainPage: async (req, res) => {
    if (req.session && req.session.Authenticated) {
      const userid = req.session.Authenticated;
      try {
        // profile 
        const reponse = await axios.get(gateway + "/Users/Profile", {params:{id:userid}});
        const userprofile = reponse.data.Profile
        req.session.userprofile = userprofile[0]


       
        return res.render('main', {userprofile:userprofile[0],teams:null, context:'main_context'});
   
      }
      catch (error) {
  
      }

    }
    return res.redirect('/')
  },
}
