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

    res.render('index', { title: 'Welcome to Scrum App homepage' });

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
      res.send("fail to authenticate")

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
  

    if (!req.body.uname || !req.body.psw) {
      return res.redirect('/')
    }
    
   
    try{
      let user = Object.create(user_info);
      user.UserName = xssFilters.inHTMLData(req.body.uname);
      user.PassWord = xssFilters.inHTMLData(req.body.psw);
        
      const reponse = await axios.post(gateway+"/Users/",user)
      console.log(reponse.data)
    }
    catch(error){

    }

  },
  
}
