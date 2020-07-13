const express = require('express');
const passport = require('passport');
const bcryptjs = require('bcryptjs');

const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middelwares');

const {User} = require('../models');

router.post('/login', isNotLoggedIn, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send({}); }
      
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return     res.send({userId: req.user.id});
      });


    })(req, res, next);
  }, function (req, res){
    res.send(req.user.id);
})

// router.post('/login', isNotLoggedIn, passport.authenticate('local'), function (req, res){
    
//     res.send({userId: req.user.id});
// })
router.get('/logout', isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    res.send('success');
});

router.post('/register', isNotLoggedIn, async function(req, res, next){
    const { id, password, emailAddress } = req.body;
    
    try{
        let correspondingUser = await User.findOne({ where : {id} });

        if(correspondingUser){
            req.flash('joinError', '이미 가입된 계정입니다.');
            return res.end('failed');
        }else{
            let hashedPassword = await bcryptjs.hash(password, 12);
            await User.create({
                id,
                email: emailAddress,
                password: hashedPassword,
            });

            return res.end('success');
        }
    }catch(error){
        console.error(error);
        return next(error);
    }
})
router.post('/id-check', async function(req, res, next){
    const { id } = req.body;

    try{
        let correspondingUser = await User.findOne({ 
            where : {id} 
        });
        
        if(correspondingUser){
            res.send(`not allowed`);
        }else{
            res.send('allowed');
        }

    }catch(error){
        return next(error);
    }
})
router.post('/certification-number-check', async function(req, res, next){
    const { certificationNumber } = req.body;

    try{
    }catch(error){
    }
})
//

router.post('/mypage', );
router.post('/find-pw', );
router.post('/find-id', );

router.delete('/withdrawal', );

module.exports = router;
