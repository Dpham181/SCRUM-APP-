"use strict"


const bcrypt = require('bcryptjs');
const xssFilters = require('xss-filters');
const axios = require("axios");

const gateway = require("../bin/Gateway");
const user_info = require("../model/user");
// authentication system 
module.exports = {


  // home page
  getHomePage: (req, res) => {

    res.render('index', { title: 'Welcome to Scrum App', error:'' });

  },


  // login  func



   SignIn: async (req, res) => {
    
    if (!req.body.uname || !req.body.psw) {
      res.render('error', {'message':"Missing Parameter"});
    }
    let user = Object.create(user_info);
    user.UserName = xssFilters.inHTMLData(req.body.uname);
    user.PassWord = xssFilters.inHTMLData(req.body.psw);
    
    
    try {
      const reponse = await axios.post(gateway + "/auth/", user);
      //authenticated 
      req.session.Authenticated = reponse.data.User_id;

      return res.redirect("/main")
      
    }
    catch (error) {
      // fail to authenticate
      res.render('index', { title: 'Welcome to Scrum App', error:'Username Or Password Incorrect' });
    }

 
    


  },
  // logout
  Logout: (req, res) => {
   
    if (req.session && req.session.Authenticated) {
   
        req.session.reset();
        return res.redirect('/') 
    }
      
  },
  
  


  // register page
  RegisterPage: async (req, res) => {
  

    try{
      let user = Object.create(user_info);
      user.UserName = xssFilters.inHTMLData(req.body.uname);
      user.PassWord = xssFilters.inHTMLData(req.body.psw);
      user.FIRST_NAME = xssFilters.inHTMLData(req.body.fname);
      user.LAST_NAME = xssFilters.inHTMLData(req.body.lname);
      user.COUNTRY = xssFilters.inHTMLData(req.body.country);
      user.ZIPCODE = xssFilters.inHTMLData(req.body.zipcode);
      user.CITY = xssFilters.inHTMLData(req.body.city);
      user.STREET = xssFilters.inHTMLData(req.body.street);
      user.STATE = xssFilters.inHTMLData(req.body.state);

      const reponse = await axios.post(gateway+"/Users/",user)
      user.PUSER_ID = reponse.data.id
      await axios.post(gateway+"/Users/Profile/",user)
      return res.redirect(req.get('referer'));

    }
    catch(error){
      res.render('index', { title: 'Welcome to Scrum App', error:'There are some info that already exits' });
    }

  },
  
}
