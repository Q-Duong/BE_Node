const {Router} = require('express');
const product = require('../models/ProductModel');
const productService = require('../services/ProductService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        productService.create(req.body)
            .then(product => {
                res.status(201).json(product);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        productService.findAll(req.body)
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        productService.deleteOne(req.params.id)
        .then(product =>{
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        productService.update(req.params.id, req.body)
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

module.exports = {router}