const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const sequelizeConfig = require('./config/config');
const sessionStore = new MySQLStore( sequelizeConfig.production );

const flash = require('connect-flash');
require('dotenv').config();
const passport = require('passport');
const passportConfig = require('./passport');
const logger = require('./logger');
const helmet = require('helmet');
const hpp = require('hpp');

const cors = require('cors');

const userRouter = require('./routes/user');
const accountRouter = require('./routes/account');
const exerciseRouter = require('./routes/exercise');
const contentsRouter = require('./routes/contents');
const searchRouter = require('./routes/search');

const sequelize = require('./models').sequelize;
sequelize.sync();
passportConfig(passport);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(process.env.NODE_ENV === 'production'){
  app.use( morgan('combined') );
  app.use(helmet());
  app.use(hpp());
}else{
  app.use( morgan('dev') );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store: sessionStore, 
  cookie:{
    httpOnly: true,
    secure: false,
    maxAge: 240*60*1000,
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/bookmark', userRouter);
app.use('/follow', userRouter);
app.use('/history', userRouter);
app.use('/statistic', userRouter);
app.use('/template', userRouter);
app.use('/setting', userRouter);

app.use('/account', accountRouter);
app.use('/exercise', exerciseRouter);
app.use('/contents', contentsRouter);
app.use('/search', searchRouter);

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
  res.render('error');
});

module.exports = app;
