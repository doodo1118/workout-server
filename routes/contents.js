
// TODO


const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');

const {Routine, User, History} = require('../models');

// url: /contents
router.get('/', async function(req, res, next){ 
    let routines = await getRoutines();
    let users = await getUsers();
    let histories  = await getHistories();

    let result = [...routines, ...users, ...histories];
    let shuffledResult = shuffleArray(result);
    res.send({result: shuffledResult});
});
async function getRoutines(){
    try{
        let result  = await Routine.findAll({
            attributes: ['id', 'userId', 'volume', 'time', 'sets', 'logs', 'memo', 'title', 'targets', ],
            where: {},
            // order: sequelize.col('age'),
            limit: 9,
            // offset: 
        });

        return result;
    }catch(error){
        console.log(error);
    }
}
async function getHistories(){
    try{
        let result  = await History.findAll({
            attributes: ['id', 'userId', 'startedAt', 'logs', 'volume', 'time', 'sets', 'targets', ],
            where: {},
            // order: sequelize.col('age'),
            limit: 20,
            // offset: 
        });

        return result;
    }catch(error){
        console.log(error);
    }
}
async function getUsers(){
    try{
        let result  = await User.findAll({
            attributes: ['id', 'introduction'],
            where: {}, 
            // order: sequelize.col('age'),
            limit: 1, 
            // offset: 
        });

        return result;
    }catch(error){
        console.log(error);
    }
}
function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

router.get('/curated', function(req, res, next){

});



module.exports = router;
