const {Router} = require('express');
const exportOrder = require('../models/ExportOrderModel');
const exportOrderService = require('../services/ExportOrderService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        exportOrderService.create(req.body)
            .then(exportOrder => {
                res.status(201).json(exportOrder);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        exportOrderService.findAll(req.body)
            .then(exportOrder => {
                res.status(200).json(exportOrder);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    // .delete('/:id', (req,res)=>{
    //     exportOrderService.deleteOne(req.params.id)
    //     .then(exportOrder =>{
    //         res.status(200).json(exportOrder);
    //     })
    //     .catch(err => {
    //         res.status(400).json({message: 'gui lai request'});
    //     })
    // })
    .patch('/:id', (req,res)=>{
        exportOrderService.update(req.params.id, req.body)
        .then(exportOrder =>{
            res.status(200).json(exportOrder)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

    module.exports = {router}