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
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
      
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
