const {Router} = require('express');
const supplierService = require('../services/SupplierService');
const getPaginationOptions = require('../utils/GetPaginationOptions');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        supplierService.create(req.body)
            .then(supplier => {
                res.status(201).json(supplier);
            })
            .catch(err => {
                res.status(400).json({message: err.toString()});
            })
    })
    .get('/', (req,res)=>{
        supplierService.findAll()
            .then(supplier => {
                res.status(200).json(supplier);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/admin', (req, res) => {
        const paginationOptions = getPaginationOptions(req)
        
        supplierService.findAllPaginate(paginationOptions)
            .then(supplier => {
                res.status(200).json({...supplier});
            })
            .catch(err => {
                res.status(400).json({ message: err });
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
            console.log(err)
            res.status(500).json({message: err.toString()})
        })
    })
  

module.exports = {router}