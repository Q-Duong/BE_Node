const {Router} = require('express');
const category = require('../models/CategoryModel');
const categoryService = require('../services/CategoryService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
            
        categoryService.create(req.body)
            .then(category => {
                res.status(201).json(category);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        categoryService.findAll(req.body)
            .then(category => {
                res.status(200).json(category);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        categoryService.deleteOne(req.params.id)
        .then(category =>{
            res.status(200).json(category);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        categoryService.update(req.params.id, req.body)
        .then(category =>{
            res.status(200).json(category)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

module.exports = {router}