const {Router} = require('express');
const permissionService = require('../services/permissionService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        permissionService.create(req.body)
            .then(permission => {
                return res.status(201).json(permission)
            })
            .catch(err => {
                res.status(400).json(err.toString())
            })
    })
    .get('/', (req,res)=>{
        permissionService.findAll()
        .then(permissions => {
            return res.status(200).json(permissions)
        })
        .catch(err => {
            res.status(400).json(err.toString())
        })
    })

module.exports = {router}