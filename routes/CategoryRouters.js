const { Router } = require('express');
const { uploadFile } = require('../middlewares/uploadFile');
const categoryService = require('../services/CategoryService');
const getPaginationOptions = require('../utils/GetPaginationOptions')
const router = Router({ mergeParams: true })

router
    .post('/', uploadFile, (req, res) => {
        const createCategoryData = req.file ? { ...req.body, image: req.file.filename } : req.body
        categoryService.create(createCategoryData)
            .then(category => {
                res.status(201).json(category);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/', (req, res) => {

        categoryService.findAll(req.body)
            .then(category => {
                res.status(200).json(category);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/admin', (req, res) => {
        const paginationOptions = getPaginationOptions(req)

        categoryService.findPaginate(paginationOptions)
            .then(category => {
                res.status(200).json(category);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .delete('/:id', (req, res) => {
        categoryService.deleteOne(req.params.id)
            .then(category => {
                res.status(200).json(category);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .put('/:id', uploadFile, (req, res) => {    
        const id = req.params.id
        const dataUpdateCategory = req.file ? { ...req.body, image: req.file.filename } : req.body
        categoryService.update(id,dataUpdateCategory)
            .then(category => {
                console.log(category)
                res.status(200).json(category)
            })
            .catch(err => {
                res.status(400).json({ message: err })
                console.log(err)
            })
    })


module.exports = { router }