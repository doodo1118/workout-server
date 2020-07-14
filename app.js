
const createError = require('http-errors');
const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sequelizeConfig = require('./config/config').development;

const passport = require('passport');
const passportConfig = require('./passport');

const flash = require('connect-flash');
const path = require('path');
const logger = require('./logger');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();
if(process.env.NODE_ENV === 'production'){
  app.use( morgan('combined') );
  app.use(helmet());
  app.use(hpp());
}else{
  app.use( morgan('dev') );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sequelize = require('./models').sequelize;
sequelize.sync();
passportConfig(passport);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store: new MySQLStore({
    ...sequelizeConfig, 
    user: sequelizeConfig.username,
  }), 
  cookie:{
    httpOnly: true,
    secure: false,
    maxAge: 240*60*1000,
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:3000'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/bookmark', routes.user);
app.use('/follow', routes.user);
app.use('/history', routes.user);
app.use('/statistic', routes.user);
app.use('/template', routes.user);
app.use('/setting', routes.user);

app.use('/account', routes.account);
app.use('/exercise', routes.exercise);
app.use('/contents', routes.contents);
app.use('/search', routes.contents);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  logger.info('hello');
  logger.error(err.message);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
