const {Router} = require('express');
const exportOrderDetails = require('../models/ExportOrderDetailsModel');
const exportOrderDetailsService = require('../services/ExportOrderDetailsService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        exportOrderDetailsService.create(req.body)
            .then(exportOrderDetails => {
                res.status(201).json(exportOrderDetails);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        exportOrderDetailsService.findAll(req.body)
            .then(exportOrderDetails => {
                res.status(200).json(exportOrderDetails);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        exportOrderDetailsService.deleteOne(req.params.id)
        .then(exportOrderDetails =>{
            res.status(200).json(exportOrderDetails);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        exportOrderDetailsService.update(req.params.id, req.body)
        .then(exportOrderDetails =>{
            res.status(200).json(exportOrderDetails)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

module.exports = {router}