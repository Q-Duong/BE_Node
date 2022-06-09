const {Router} = require('express');
const brand = require('../models/BrandModel');
const brandService = require('../services/BrandService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        brandService.create(req.body)
            .then(brand => {
                res.status(201).json(brand);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        brandService.findAll(req.body)
            .then(brand => {
                res.status(200).json(brand);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        brandService.deleteOne(req.params.id)
        .then(brand =>{
            res.status(200).json(brand);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        console.log(req.params.id)
        brandService.update(req.params.id, req.body)
        .then(brand =>{
            res.status(200).json(brand)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

    module.exports = {router}