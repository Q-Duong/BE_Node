const {Router} = require('express');
const exportOrderService = require('../services/ExportOrderService');
const exportOrderDetailService = require('../services/ExportOrderDetailsService');
const paymentService = require('../services/PaymentService');
const warehouseService  = require('../services/WarehouseService')
const { checkWarehouseQuantity } = require('../middlewares/checkWarehouseQuantity');
const router = Router({ mergeParams: true })

router
    .post('/', checkWarehouseQuantity, (req,res)=>{
        const exportOrderData = req.body.exportOrder
        const purchaseProductDatas = req.body.purchaseProducts

        const promiseCreateExportOrder = exportOrderService.create(exportOrderData)
        const promiseCreateExportOrderDetails = Promise.all(purchaseProductDatas.map(
            purchaseProductData => exportOrderDetailService.create({
                product: purchaseProductData.productId,
                productPrice: purchaseProductData.price,
                productQuantity: purchaseProductData.quantity
            })
        ))
        const promiseUpdateQuantityWarehouse =  Promise.all(purchaseProductDatas.map(
            purchaseProductData => warehouseService.updateQuantity({
                id: purchaseProductData.warehouseId,
                quantity: purchaseProductData.quantity
            })
        ))
        const promiseCreatePayment = paymentService.create()

        Promise.all([promiseCreateExportOrder, promiseCreateExportOrderDetails, promiseCreatePayment, promiseUpdateQuantityWarehouse])
            .then(results =>{
                results[0].details = results[1]
                results[0].save()
                results[2].exportOrder = results[0]
                results[2].save()
                return res.status(201).json(results)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({message: err})
            })
    })
    .get('/', (req,res)=>{
        exportOrderService.findAll()
            .then(exportOrder => {
                res.status(200).json(exportOrder);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: err});
            })
    })
    // .delete('/:id', (req,res)=>{
    //     exportOrderService.deleteOne(req.params.id)
    //     .then(exportOrder =>{
    //         res.status(200).json(exportOrder);
    //     })
    //     .catch(err => {
    //         res.status(400).json({message: 'gui lai request'});
    //     })
    // })
    .patch('/:id', (req,res)=>{
        exportOrderService.update(req.params.id, req.body)
        .then(exportOrder =>{
            res.status(200).json(exportOrder)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

    module.exports = {router}