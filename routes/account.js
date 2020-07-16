const express = require('express');
const passport = require('passport');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const {User} = require('../models');

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            res.status(401);
            res.json({message:'auth failed'});
         }
      
        const token = jwt.sign({
            id: user.id, 
        }, process.env.JWT_SECRET, {
            expiresIn: '240m', 
            issuer: 'workout-api',
        });
        return res.json({
            code: 200, 
            jwt: token, 
            userId: user.id,
        })
    })(req, res, next);
})

router.get('/logout', (req, res)=>{
    req.logout();
    req.session.destroy();
    res.send('success');
});

router.post('/register', async function(req, res, next){
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
            res.send({message:`not allowed`});
        }else{
            res.send({message:'allowed'});
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
