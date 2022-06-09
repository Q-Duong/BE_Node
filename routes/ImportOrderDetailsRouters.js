const {Router} = require('express');
const importOrderDetails = require('../models/ImportOrderDetailsModel');
const importOrderDetailsService = require('../services/ImportOrderDetailsService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        importOrderDetailsService.create(req.body)
            .then(importOrderDetails => {
                res.status(201).json(importOrderDetails);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        importOrderDetailsService.findAll(req.body)
            .then(importOrderDetails => {
                res.status(200).json(importOrderDetails);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    // .delete('/:id', (req,res)=>{
    //     importOrderDetailsService.deleteOne(req.params.id)
    //     .then(importOrderDetails =>{
    //         res.status(200).json(importOrderDetails);
    //     })
    //     .catch(err => {
    //         res.status(400).json({message: 'gui lai request'});
    //     })
    // })
    .put('/:id', (req,res)=>{
        importOrderDetailsService.update(req.params.id, req.body)
        .then(importOrderDetails =>{
            res.status(200).json(importOrderDetails)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

    module.exports = {router}