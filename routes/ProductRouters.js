const {Router} = require('express');
const productService = require('../services/ProductService');
const supplierService = require('../services/SupplierService')
const router = Router({ mergeParams: true })
const { uploadFile } = require('../middlewares/uploadFile');


router
    .post('/',uploadFile, (req,res)=>{
        productService.create({...req.body, image: req.file.filename})
            .then(product => {
                console.log(product)
                return res.status(201).json(product);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        const searchTerm = req.query.searchTerm
        if(searchTerm) {}
        else {
            productService.findAll(req.body)
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
        }
    })
    .get('/supplier/:id', (req,res) => {
        const supplierId = req.params.id
        supplierService.findbyId(supplierId)
            .then(supplier => {
                const findProductPromises = supplier.products.map(product => productService.findbyId(product))
                return Promise.all(findProductPromises)
            })
            .then(products => {
                return res.status(200).json(products)
            })
            .catch(err => {
                return res.status(500).json({message: err})
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
        productService.update(req.params.id,{...req.body, image: req.file.filename})
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(err => {
            res.status(400).json({message: err})
        })
    })
  

module.exports = {router}