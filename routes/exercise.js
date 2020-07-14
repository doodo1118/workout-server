const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middelwares');

const {History} = require('../models');

// /log
// isLoggedIn
router.post('/result', verifyToken, async function(req, res, next){

    const {userId, logs, summary} = req.body.me;
    const {volume, sets, targets} = summary;

    const { startedExerciseAt, runningTime} = req.body;
    console.log('ssssssss', req.decoded);
    // if(userId === req.user.id)
    
    try{
        let history = await History.create({
            userId: userId, 
            startedAt: startedExerciseAt,
            logs:{ logs }, 
            volume:volume, 
            time: runningTime, 
            sets: sets, 
            targets: {targets}, 
            // memo, 
        });
        
        
        let historyId = history.id;
        res.send({historyId: historyId});
        next();
    }catch(e){
        console.log(e);
    }
    
});

module.exports = router;