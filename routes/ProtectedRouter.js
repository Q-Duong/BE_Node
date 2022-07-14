const {Router} = require('express');
const { verifyToken, verifyByRole } = require('../middlewares/auth');
const router = Router({ mergeParams: true })
const mongoose = require('mongoose');
const translateCollectionName = require('../utils/translateCollectionName');
const nodemailer = require('nodemailer')
router
    .get('/linkroute',verifyToken,(req,res)=>{
        const userReadPermission = req.user.role.permissions
            .filter(permission => permission.title.includes('read_'))
            .map(permission => permission.title.substring(5).toLowerCase())
    
        let navbarNames = Object.keys(mongoose.connections[0].collections).map((collection,index) => ({
                id: index,
                title: translateCollectionName(collection),
                heading: collection
            }))
        navbarNames = navbarNames.filter(navbarName => userReadPermission.includes(navbarName.heading))

        navbarNames.unshift({
            id:navbarNames.length,
            title: 'thống kê',
            heading: 'dashboard'
        })

        return res.json(navbarNames)
    })
    .get('/checkroute',verifyToken, (req,res) => {
        const permission = req.query.permission
        console.log(permission)
        console.log(req.user.role.permissions)
        if(!req.user.role.permissions.some(p => p.title === permission))
            return res.status(401).json({message: 'you dont have permission to access'})
        else
            return res.status(200).json({message: 'welcome sir'})
    })
module.exports = {router}