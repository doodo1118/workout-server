
// TODO
// table schema to be changed. 
// routes as well. 
const express = require('express');
const router = express.Router();

const { verifyToken } = require('./middelwares');

const {Bookmark} = require('../models');


router.get('/:userId', async function(req, res, next){
    console.log('bookmark get');
    let result = await getBookmarksByUserId(req.params.userId);
    res.json({result : result});
});
async function getBookmarksByUserId(userId){
    try{
        let result  = await Bookmark.findAll({
            attributes: ['routineId'],
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
router.post('/:userId', verifyToken, async function(req, res, next){
    try{
        let result = await Bookmark.create({
            followingId : req.params.userId,
            followerId : req.user.id,
        })
    }catch(e){

    }
});

router.delete('/', verifyToken, async function(req, res, next){
    let bookmarkId; 

    await Bookmark.detroy({
        where:{
            id: bookmarkId,
        }
    });
});

module.exports = router;
