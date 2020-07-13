const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    session: true, 
  }, async (usernameField, passwordField, done) => {
    try {

      let correspondingUser = await User.findOne({ where: { id: usernameField } });
      if ( correspondingUser ) {

        let passwordsAreEqual = await bcryptjs.compare(passwordField, correspondingUser.password);
        if (passwordsAreEqual) {
          done(null, correspondingUser);
        } else {
          done(null, false, { message: 'auth failed' });
          
        }
      } else {
        done(null, false, { message: 'auth failed' });
      }
      
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
