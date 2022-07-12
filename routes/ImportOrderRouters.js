const {Router} = require('express');
const importOrderService = require('../services/ImportOrderService');
const importDetailOrderService = require('../services/ImportOrderDetailsService');
const warehouseService = require('../services/WarehouseService');
const {checkExpireDate} = require('../utils/Moment')
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        const importOrderData = req.body.importOrderData;
        const purchasedProducts = req.body.purchasedProducts;

        const promiseCreateOrder = importOrderService.create(importOrderData)
        const promiseCreateDetailOrder = Promise.all(purchasedProducts.map(
            product => {
                return importDetailOrderService.create({productId: product._id, productQuantity: product.stockQuantity, productPrice:product.stockPrice})                
            }))
        const promiseCreateOrUpdateWarehouses = Promise.all(purchasedProducts.map(
            async product => {
                try {
                    const warehouses = await warehouseService
                                .findByProductId(product._id)
                    const foundWarehouse = warehouses.find(warehouse =>
                        checkExpireDate(warehouse.expireIn, product.expireIn)
                        && warehouse.supplier === importOrderData.supplierId
                        && warehouse.stockPrice === product.stockPrice
                        )
                    if(foundWarehouse) {
                        foundWarehouse.stockQuantity += product.stockQuantity
                        foundWarehouse.save()
                        return Promise.resolve(foundWarehouse)
                    } else {
                        return warehouseService.create({
                            productId: product._id, 
                            supplierId: importOrderData.supplierId, 
                            stockQuantity: product.stockQuantity, 
                            stockPrice: product.stockPrice,
                            expireIn: product.expireIn,
                            manufacturingDate: product.manufacturingDate,
                            active: false
                        })
                    }
                } catch (error) {
                    return Promise.reject(error)
                }
            }))
            
        Promise.all([promiseCreateOrder, promiseCreateDetailOrder, promiseCreateOrUpdateWarehouses])
            .then(results => {
                results[0].details = results[1]
                results[0].save()
                return res.status(201).json(results[0])
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({message: err})
            })
    })
    .get('/', (req,res)=>{
        importOrderService.findAll(req.body)
            .then(importOrder => {
                res.status(200).json(importOrder);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .patch('/:id', (req,res)=>{
        importOrderService.update(req.params.id, req.body)
        .then(importOrder =>{
            res.status(200).json(importOrder)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

module.exports = {router}