const { Router } = require('express');
const productService = require('../services/ProductService');
const supplierService = require('../services/SupplierService');
const router = Router({ mergeParams: true });
const { uploadFile } = require('../middlewares/uploadFile');
const getPaginationOptions = require('../utils/GetPaginationOptions');


router
    .post('/', uploadFile, (req, res) => {
        const createProductData = req.file ? { ...req.body, image: req.file.filename } : req.bodt
        productService.create(createProductData)
            .then(product => {
                return res.status(201).json(product);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: err });
            })
    })
    .get('/', (req, res) => {
        productService.findAll()
            .then(supplier => {
                res.status(200).json(supplier);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/admin', (req, res) => {
        const paginationOptions = getPaginationOptions(req)

        productService.findAllPaginate(paginationOptions)
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })

    })
    .get('/supplier/:id', (req, res) => {
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
                return res.status(500).json({ message: err })
            })
    })
    .delete('/:id', (req, res) => {
        console.log(req.params.id)
        productService.deleteOne(req.params.id)
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .put('/:id', uploadFile, (req, res) => {
        const id = req.params.id
        const updateProductData = req.file ? { ...req.body, image: req.file.filename } : req.body
        productService.update(id, updateProductData)
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(400).json({ message: err })
            })
    })


module.exports = { router }