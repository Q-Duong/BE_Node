const {Router} = require('express');
const productService = require('../services/ProductService');
const router = Router({ mergeParams: true })
const { uploadFile } = require('../middlewares/uploadFile');


router
    .post('/',uploadFile, (req,res)=>{
        productService.create({...req.body, productImage: req.file.filename})
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
        console.log(req.params.id)
        productService.deleteOne(req.params.id)
        .then(product =>{
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(400).json({message: err});
        })
    })
    .put('/:id', uploadFile, (req,res)=>{
        productService.update({...req.body, productImage: req.file.filename})
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
    })
  

module.exports = {router}