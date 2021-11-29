"use strict"

// libs
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const session = require('client-sessions');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  cookieName: 'session',
  
  secret: 'first secret',
  duration: 3 * 60 * 1000,
  activeDuration: 3 * 60 * 1000,
  cookie: {
  httpOnly: true, // when true, cookie is not accessible from javascript
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// routers 
// pages routing 
const indexRouter = require('./routes/pages/index');
const MainRouter = require('./routes/pages/main');
app.use('/', indexRouter);
app.use('/main', MainRouter);

// authentication routing 
const SignInRouter = require('./routes/authentication/SignIn');
const LogoutRouter = require('./routes/authentication/logout');
const RegisterRouter = require('./routes/authentication/register');
app.use('/SignIn/', SignInRouter);
app.use('/Register/', RegisterRouter);
app.use('/LogOut/', LogoutRouter);

// team routing 
const ShowTeams = require('./routes/Team/showTeams');
const createTeam = require('./routes/Team/createTeam');
const viewMemebers = require('./routes/Team/viewMemebers');
const QuitTeam = require('./routes/Team/quitTeam');

app.use('/Teams', ShowTeams);
app.use('/Teams/', createTeam);
app.use('/Memebers', viewMemebers);
app.use('/Quit', QuitTeam);

// project routing 
const ProjectsRouter = require('./routes/project/projects');
const Projects_contextRouter = require('./routes/project/projects_context');
const MakeProject = require('./routes/project/make_project');

app.use('/main/projects',  ProjectsRouter);
app.use('/projects',  Projects_contextRouter);
app.use('/makeprojects/',  MakeProject);



app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
