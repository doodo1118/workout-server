const express = require('express');
const router = express.Router();

const {User, Routine} = require('../models');
const {Op} = require('sequelize');

// /search
router.get('/:query', async function(req, res, next){
    let routines = await getRoutines();
    let users = await getUsers();

    res.send({
        routines:routines, 
        users: users,
    });
});

async function getRoutines(){
    try{
        let result  = await Routine.findAll({
            attributes: ['madeBy', 'title'],
            where: {
                [Op.or]:[
                    {
                        userId:{
                            [Op.substring]:''
                        }
                    },
                    {
                        title:{
                            [Op.substring]:''
                        }
                    },
                ]
            }, 
            // order: sequelize.col('age'),
            limit: 5,
        });

        return result;
    }catch(error){
        console.log(error);
    }
}
async function getUsers(){
    try{
        let result  = await User.findAll({
            attributes: ['id'],
            where: {}, 
            // order: sequelize.col('age'),
            limit: 5, 
        });

        return result;
    }catch(error){
        console.log(error);
    }
}

module.exports = router;
