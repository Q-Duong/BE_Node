const {Router} = require('express');
const { verifyToken } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');
const category = require('../models/CategoryModel');
const categoryService = require('../services/CategoryService');
const getPaginationOptions = require('../utils/GetPaginationOptions')
const router = Router({ mergeParams: true })

router
    .post('/', uploadFile, (req,res)=>{
        categoryService.create({...req.body,image:req.file.filename})
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
    .get('/admin', (req,res)=>{
        const paginationOptions = getPaginationOptions(req)

        categoryService.findPaginate(paginationOptions)
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
            res.status(400).json({message: err});
        })
    })
    .put('/:id',uploadFile, (req,res)=>{
        categoryService.update(req.params.id, {...req.body,image:req.file.filename})
        .then(category =>{
            res.status(200).json(category)
        })
        .catch(err => {
            res.status(400).json({message: err})
            console.log(err)
        })
    })
  

module.exports = {router}