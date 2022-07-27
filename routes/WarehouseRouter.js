const { Router } = require('express');
const { checkActiveProduct } = require('../middlewares/checkActiveProduct');
const warehouseService = require('../services/WarehouseService');
const getFilterOptions = require('../utils/GetFilterOptions');
const getPaginationOptions = require('../utils/GetPaginationOptions')
const router = Router({ mergeParams: true })

router
    .post('/', (req, res) => {
        warehouseService.findbyProductIDAndExpireIn({ product: req.body.product, expireIn: req.body.expireIn })
            .then(warehouse => {
                if (warehouse) {
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
                return res.status(400).json({ message: err });
            })
    })
    .get('/', (req, res) => {
        const { searchTerm } = req.query
        if (searchTerm && searchTerm != 'undefined' && searchTerm != 'null') {
            warehouseService.findBySearchTerm(searchTerm)
                .then(warehouses => {
                    res.status(200).json(warehouses);
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({ message: err });
                })
        }
        else {
            warehouseService.findAll()
                .then(warehouses => {
                    res.status(200).json(warehouses);
                })
                .catch(err => {
                    res.status(400).json({ message: err });
                })
        }
    })
    .get('/admin', (req, res) => {
        const paginationOptions = getPaginationOptions(req)
        const filterOptions = getFilterOptions(req)
        warehouseService.findAllWithoutActive(filterOptions, paginationOptions)
            .then(warehouses => {
                res.status(200).json({ ...warehouses });
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/inventoryStatistic', (req, res) => {
        warehouseService.findAll()
            .then(warehouses => {
                const results = warehouses.reduce((results, warehouse) => {
                    const soldWarehouse = warehouse.soldQuantity
                    const stockWarehouse = warehouse.stockQuantity

                    results[warehouse.product.name] = {
                        soldWarehouse,
                        stockWarehouse
                    }
                    return results
                }, new Object())
                return res.status(200).json(results)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err.toString() })
            })
    })
    .get('/category/:id', (req, res) => {
        console.log(req.params.id)
        warehouseService.findbyCategoryID(req.params.id)
            .then(warehouse => {
                res.status(200).json(warehouse);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/:id', (req, res) => {
        warehouseService.findbyID(req.params.id)
            .then(warehouse => {
                res.status(200).json(warehouse);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .get('/top/:limit', (req, res) => {
        let { limit } = req.params
        limit = limit && Number(limit) > 0 ? limit : 10
        warehouseService.findAndSortBySoldQuantity(req.params.limit)
            .then(warehouse => {
                res.status(200).json(warehouse);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })

    // .get('/increment', (req, res) => {

    // })
    .delete('/:id', (req, res) => {
        warehouseService.deleteOne(req.params.id)
            .then(warehouse => {
                res.status(200).json(warehouse);
            })
            .catch(err => {
                res.status(400).json({ message: err });
            })
    })
    .put('/:id', checkActiveProduct, (req, res) => {
        if (req.body.soldPrice <= 0 && req.body.active === 'true')
            return res.status(400).json({ message: 'giá bán phải lớn hơn 0' })
        warehouseService.update(req.params.id, req.body)
            .then(warehouse => {
                res.status(200).json(warehouse)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.toString() })
            })
    })

module.exports = { router }