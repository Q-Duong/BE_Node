const {Router} = require('express');
const roleService = require('../services/roleService');
const permissionService = require('../services/permissionService');

const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        roleService.create(req.body)
            .then(role => {
                return res.status(201).json(role)
            })
            .catch(err => {
                res.status(400).json(err.toString())
            })
    })
    .get('/', (req,res)=>{
        roleService.findAll()
        .then(roles => {
            return res.status(200).json(roles)
        })
        .catch(err => {
            res.status(400).json(err.toString())
        })
    })

module.exports = {router}