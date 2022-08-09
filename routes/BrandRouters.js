const { Router } = require('express');
const { verifyToken, verifyByRole, verifyByPermission } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');
const brand = require('../models/BrandModel');
const brandService = require('../services/BrandService');

const getPaginationOptions = require('../utils/GetPaginationOptions')
const router = Router({ mergeParams: true })

router
    .post('/', uploadFile, (req, res) => {
        const createBrandData = req.file ? { ...req.body, image: req.file.filename } : req.body
        brandService.create(createBrandData)
            .then(brand => {
                res.status(201).json(brand);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/', (req, res) => {

        brandService.findAll(req.body)
            .then(brand => {
                res.status(200).json(brand);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/deleted', (req, res) => {

        brandService.findDelete(req.body)
            .then(brand => {
                res.status(200).json(brand);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/admin', (req, res) => {
        const paginationOptions = getPaginationOptions(req)

        brandService.findPaginate(paginationOptions)
            .then(brand => {
                res.status(200).json(brand);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .delete('/:id', (req, res) => {
        brandService.deleteOne(req.params.id)
            .then(brand => {
                res.status(200).json(brand);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .put('/:id', uploadFile, (req, res) => {
        const id = req.params.id
        const updateBrandData = req.file ? { ...req.body, image: req.file.filename } : req.body
        brandService.update(id, updateBrandData)
            .then(brand => {
                res.status(200).json(brand)
            })
            .catch(err => {
                res.status(400).json({ message: err })
            })
    })
    .post('/test',uploadFile,(req,res) =>{
        return res.json(req.file)
    })


module.exports = { router }