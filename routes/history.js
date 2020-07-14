
// TODO

const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const { verifyToken } = require('./middelwares');

const {History} = require('../models');


router.get('/:userId', async function(req, res, next){
    console.log('history get');
    let history = await getHistoriesByUserId(req.params.userId);
    res.send({result: history});
})
async function getHistoriesByUserId(userId){
    try{
        let result  = await History.findAll({
            attributes: ['id', 'userId', 'startedAt', 'logs', 'volume', 'time', 'sets', 'targets', ],
            where: {
                userId: userId, 
            },
            order: [
                [sequelize.col('startedAt'), 'DESC'],
            ], 
            limit: 20,
        });

        return result;
    }catch(error){
        console.log(error);
    }
}

router.post('/', verifyToken, async function(req, res, next){
    console.log('history post');
    let history = await createHistory(req);
    res.send({historyId: history.id});
})
async function createHistory( req ){
    let {startedExerciseAt, runningTime, me} =req.body;
    let {userId, logs, summary} = me;
    let {volume, sets, targets} = summary;

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
        
        return history; 
    }catch(e){
        console.log(e);
    }
}

module.exports = router;
