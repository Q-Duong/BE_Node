const {Router} = require('express');
const { verifyToken, verifyByRole } = require('../middlewares/auth');
const router = Router({ mergeParams: true })
const mongoose = require('mongoose')

router
    .get('/',verifyToken, verifyByRole(['ADMIN','EMPLOYEE']),(req,res)=>{
       res.json(
        Object.keys(mongoose.connections[0].collections)
            .filter(
                collection => req.user.role.permissions.includes(collection)
            )
       ) 
    })
module.exports = {router}