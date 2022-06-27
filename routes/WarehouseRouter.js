const {Router} = require('express');
const warehouseService= require('../services/WarehouseService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        warehouseService.findbyProductIDAndExpireIn({product:req.body.product, expireIn: req.body.expireIn})
            .then(warehouse => {
                if(warehouse) {
                    warehouse.stockQuantity += req.body.stockQuantity
                    warehouse.save()
                    return Promise.resolve(warehouse)
                } else {
                    return warehouseService.create(req.body)
                }
            })
            .then(createdWarehouse => {
                return res.status(201).json(createdWarehouse);
            })
            .catch(err => {
                return res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        const {searchTerm} = req.query
        if(searchTerm && searchTerm !='undefined' && searchTerm !='null') {
            warehouseService.findBySearchTerm(searchTerm)
            .then(warehouses => {
                res.status(200).json(warehouses);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: err});
            })
        }
        else {
            warehouseService.findAll()
                .then(warehouses => {
                    res.status(200).json(warehouses);
                })
                .catch(err => {
                    res.status(400).json({message: err});
                })
        }
    })
    .get('/:id', (req,res)=>{
        warehouseService.findbyID(req.params.id)
            .then(warehouse => {
                res.status(200).json(warehouse);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })

module.exports = {router}