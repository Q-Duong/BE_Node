const {Router} = require('express');
const importOrder = require('../models/ImportOrderModel');
const importOrderService = require('../services/ImportOrderService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        Promise.all()
        importOrderService.create(req.body)
            .then(importOrder => {
                res.status(201).json(importOrder);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        importOrderService.findAll(req.body)
            .then(importOrder => {
                res.status(200).json(importOrder);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    // .delete('/:id', (req,res)=>{
    //     importOrderService.deleteOne(req.params.id)
    //     .then(importOrder =>{
    //         res.status(200).json(importOrder);
    //     })
    //     .catch(err => {
    //         res.status(400).json({message: 'gui lai request'});
    //     })
    // })
    .patch('/:id', (req,res)=>{
        importOrderService.update(req.params.id, req.body)
        .then(importOrder =>{
            res.status(200).json(importOrder)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

module.exports = {router}