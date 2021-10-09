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
        
        const reponse = await axios.get(gateway + "/Users/Profile", {params:{id:userid}});
        const userprofile = reponse.data.Profile
        
        return res.render('main', {userprofile:userprofile[0]});
        
      }
      catch (error) {
  
      }

    }
    return res.redirect('/')
  },


}
