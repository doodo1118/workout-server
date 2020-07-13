const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middelwares');

const {User, Follow, Routine, Bookmark} = require('../models');


router.get('/:user', async function(req, res, next){
    let result = await getUserInformation( req.params.id );
    res.send(result);
});
async function getUserInformation(userId){
    try{
        let result = await User.findAll({
            attributes:[''], 
            where:{
                userId: userId, 
            }
        })
        return result;
        
    }catch(error){
        console.log(error);
    }
}

router.get('/bookmark/:user', async function(req, res, next){
    let result = await getBookmarksByUserId( req.params.id );
    res.send(result);
});

async function getBookmarksByUserId(userId){
    try{
        let result = await Bookmark.findAll({
            where:{
                userId: userId, 
            }
        })
        return result;
        
    }catch(error){
        console.log(error);
    }
}
router.get('/follow/:user', async function(req, res, next){

});
router.get('/history/:user', async function(req, res, next){
  
});
router.get('/statistic/:user', async function(req, res, next){
  
});
router.get('/templates/:user', async function(req, res, next){
  
});
router.get('/settings/:user', async function(req, res, next){

});


router.post('/bookmark/', isLoggedIn, async function(req, res, next){
    try{
        await Bookmark.create({
            // userId: req.user.id,
            // routineId: req.body.routine,
        })
    }catch(e){}
});
router.post('/follow/:user', isLoggedIn, async function(req, res, next){
    try{
        await Follow.create({
            followingId : req.params.user,
            followerId : req.user.id,
        })
    }catch(e){}
});
router.post('/settings', async function(req, res, next){
  
});
router.post('/template', async function(req, res, next){
  
});

// ?? delete는 url에 명시적으로 params전달?
router.delete('/follow/:user', isLoggedIn, async function(req, res, next){
    let following = req.params.uesr;
    let follower = req.user.id;

    await Follow.detroy({
        where:{
            followingId: following,
            followerId: follower, 
        }
    });
});
router.delete('/bookmark', isLoggedIn, async function(req, res, next){
    let bookmarkId; 

    await Bookmark.detroy({
        where:{
            id: bookmarkId,
        }
    });
});
router.delete('/template', isLoggedIn, async function(req, res, next){
    await Routine.detroy({
        where:{
            // id: ,
        }
    });
});

module.exports = router;
