const express = require('express');
const router = express.Router();

const {User } = require('../models');


router.get('/:user', async function(req, res, next){
    let result = await getUserInformation( req.params.id );
    res.send(result);
});
async function getUserInformation(userId){
    try{
        let result = await User.findAll({
            attributes:['id', 'introduction', 'image'], 
            where:{
                userId: userId, 
            }
        })
        return result;
        
    }catch(error){
        console.log(error);
    }
}

module.exports = router;
