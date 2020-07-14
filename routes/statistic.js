
// TODO

const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middelwares');

const {Follow} = require('../models');


router.get('/:user', async function(req, res, next){
    let result = await getFollowsByUserId(req.params.userId);
    res.json({result : result});
});
async function getFollowsByUserId(userId){
    try{
        let result  = await Follow.findAll({
            attributes: ['followingId', 'followerId', ],
            where: {
                userId: userId, 
            },
            limit: 70,
        });

        return result;
    }catch(error){
        console.log(error);
    }
}
module.exports = router;
