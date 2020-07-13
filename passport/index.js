// const passport = require('passport');
const localStrategy = require('./localStrategy');
const {User} = require('../models');

module.exports = (passport)=>{
    passport.serializeUser((user, done)=>{       
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done)=>{
        console.log("deserialize", id);
        
        User.findByPk(id)
        .then(user=>done(null, user))
        .catch(err=>done(err))
    });

    localStrategy(passport);
}