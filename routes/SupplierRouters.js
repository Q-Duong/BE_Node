const {Router} = require('express');
const supplier = require('../models/SupplierModel');
const supplierService = require('../services/SupplierService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        supplierService.create(req.body)
            .then(supplier => {
                res.status(201).json(supplier);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        supplierService.findAll(req.body)
            .then(supplier => {
                res.status(200).json(supplier);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        supplierService.deleteOne(req.params.id)
        .then(supplier =>{
            res.status(200).json(supplier);
        })
        .catch(err => {
            res.status(400).json({message: err});
        })
    })
    .put('/:id', (req,res)=>{
        supplierService.update(req.params.id, req.body)
        .then(supplier =>{
            res.status(200).json(supplier)
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
    })
  

module.exports = {router}