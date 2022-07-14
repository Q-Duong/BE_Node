const {Router} = require('express');
const permissionService = require('../services/permissionService');
const roleService = require('../services/roleService');

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
    .post('/haha', async (req,res) => {
        const permissions = await permissionService.findAll()
        const role = await roleService.create({title: 'ADMIN', description: 'this is super user, you can you anything',permissions})
        res.json(role)
    })
module.exports = {router}