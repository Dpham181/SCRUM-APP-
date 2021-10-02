"use strict"



const xssFilters = require('xss-filters');
const axios = require("axios");



module.exports = {


  // main page
  getMainPage: (req, res) => {
    if (req.session && req.session.Authenticated) {
      
        return res.render('main', {USERID:req.session.Authenticated});

    }
    return res.redirect('/')

  },


}
