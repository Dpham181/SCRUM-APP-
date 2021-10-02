"use strict"


const bcrypt = require('bcryptjs');
const xssFilters = require('xss-filters');
const axios = require("axios");



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
    let authUrl = "/";
    const username = xssFilters.inHTMLData(req.body.uname);
    const password = xssFilters.inHTMLData(req.body.psw);
    
    const user = {UserName:username, PassWord:password}
    try {
      const reponse = await axios.post("http://localhost:5500/auth/", user);
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
    console.log('jump1')
    if (req.session && req.session.Authenticated) {
      console.log('jump2')

        req.session.reset();
        return res.redirect('/') 
    }
      
  },
  /*
  


  // register page
  RegisterPage: (req, res) => {
    const saltRounds = 10;

    if (!req.body.uname || !req.body.psw) {
      return res.redirect('/')
    }

    let Users = UserController.getUser();
    const userDB = UserController.getUserbyUserName(req.body.uname); 

    if(Object.entries(userDB).length === 0){
    const username = xssFilters.inHTMLData(req.body.uname);
    const password = xssFilters.inHTMLData(req.body.psw);
    const autoIncrement =  Users.length +1;
    bcrypt.hash(password, saltRounds, function(err, hash) {
    user.userId = autoIncrement;
    user.username = username;
    user.password = hash;
    UserController.setUser(user)

    });
   

    return res.redirect("/");
    }
    return res.redirect('/')

    

  },
  */
}
