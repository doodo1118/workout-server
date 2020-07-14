
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
router.post('/', verifyToken, async function(req, res, next){
    // ?where to put res.send()
    let result = await createFollow(req, next);
    res.send({
        code:200,

    });
});
async function createFollow(req, next){
    try{
        let result = await Follow.create({
            followingId : req.body.followingId,
            followerId : req.decoded.id,
        })
        return result; 
    }catch(e){
        next(e);
    }
}
// ?? delete는 url에 명시적으로 params전달?
router.delete('/', verifyToken, async function(req, res, next){
    let result = await deleteFollow(); 
    res.send({
        
    })
});
async function deleteFollow(req, next){
    let following = req.body.followingId;
    let follower = req.user.id;

    try{
        let result = await Follow.detroy({
            where:{
                followingId: following,
                followerId: follower, 
            }
        });
        return result ;
    }catch(e){
        next(e);
    }
}
module.exports = router;
