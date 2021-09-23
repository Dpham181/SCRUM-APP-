"use strict"


const bcrypt = require('bcryptjs');
const xssFilters = require('xss-filters');




// authentication system 
module.exports = {


  // home page
  getHomePage: (req, res) => {

    res.render('index', { title: 'Welcome to Scrum App homepage' });

  },


  // login  page

/*

  AuthenticatePage: (req, res) => {
    if (!req.body.uname || !req.body.psw) {
      res.send('Http error code 400: missing parameters')
    }
    let authUrl = "/";
    const User = UserController.getUserbyUserName(req.body.uname);
    const username = xssFilters.inHTMLData(req.body.uname);
    const password = xssFilters.inHTMLData(req.body.psw);
    if(Object.entries(User).length === 0){
      return res.redirect(req.get('referer'));

    }
      if (User.username === username) {
        const hashpass = User.password;

        bcrypt.compare(password, hashpass, function (err, ress) {
          if (ress) {
            authUrl = "/main" ;
            req.session.user = User.username;
            res.setHeader("Content-Type", "text/html")

            return res.redirect(authUrl)

          }
          return res.redirect(authUrl)

        });
      }


    


  },
  // logout
  Logout: (req, res) => {
    if (req.session && req.session.user) {
        req.session.reset();
        return res.redirect('/') 
    }
      
  },


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
