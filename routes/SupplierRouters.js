const {Router} = require('express');
const supplierService = require('../services/SupplierService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        supplierService.create(req.body)
            .then(supplier => {
                res.status(201).json(supplier);
            })
            .catch(err => {
                console.log(err)
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
        console.log(req.body)
        supplierService.update(req.params.id, req.body)
        .then(supplier =>{
            console.log(supplier)
            res.status(200).json(supplier)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err.toString()})
        })
    })
  

module.exports = {router}