const {Router} = require('express');
const exportOrderService = require('../services/ExportOrderService');
const exportOrderDetailService = require('../services/ExportOrderDetailsService');
const paymentService = require('../services/PaymentService');
const warehouseService = require('../services/WarehouseService');
const { checkWarehouseQuantity } = require('../middlewares/checkWarehouseQuantity');
const {verifyToken} = require('../middlewares/auth')
const {payMoMo} = require('../middlewares/payMoMo')

const moment = require('moment')

const router = Router({ mergeParams: true })

router
    .post('/',verifyToken, checkWarehouseQuantity, (req,res)=>{
        const exportOrderData = req.body.exportOrder
        const purchaseProductDatas = req.body.purchaseProducts
        const promiseCreateExportOrder = exportOrderService.create({...exportOrderData,customer: req.user.id})
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

        const promiseCreatePayment =  paymentService.create()

        Promise.all([promiseCreateExportOrder, promiseCreateExportOrderDetails, promiseCreatePayment, promiseUpdateQuantityWarehouse])
            .then(results =>{
                results[0].details = results[1]
                results[0].save()
                results[2].exportOrder = results[0]
                results[2].save()

                if(exportOrderData.paymentMethod === 'MOMO') {
                    req.exportOrder = results[0]
                    return payMoMo(req,res)
                } else 
                    return Promise.resolve({message: 'thanh toán thành công'})
            })
            .then(result => {
                return res.status(201).json(result)
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
    
    .get('/revenue', (req, res) => {
        exportOrderDetailService.findAll()
            .then(async exportOrderDetail => {
                const results = await exportOrderDetail.reduce( async (revenueResults, exportOrderDetail) => {
                    let results = await revenueResults
                    const month = moment(exportOrderDetail.createdAt).month() + 1
                    const year = moment(exportOrderDetail.createdAt).year()
                    const day = moment(exportOrderDetail.createdAt).date()
                    const warehouse = await warehouseService.findByProductId(exportOrderDetail.product)
                    console.log(exportOrderDetail)
                    console.log(warehouse)
                    const myIncome = exportOrderDetail.productPrice * exportOrderDetail.productQuantity
                    const myIncrement = (exportOrderDetail.productPrice - warehouse[0].stockPrice) * exportOrderDetail.productQuantity
                  
                    const existedYear = results.hasOwnProperty(year)
                    if (existedYear) {
                        const existedMonth = results[year].hasOwnProperty(month)
                        if (existedMonth) {
                            const existedDay = results[year][month].hasOwnProperty(day)
                            if (existedDay) {
                                results[year][month][day]['income'] += myIncome
                                results[year][month][day]['increment'] += myIncrement
                            } else {
                                results[year][month] = {
                                    ...results[year][month],
                                    [day]: {
                                        income: myIncome,
                                        increment: myIncrement
                                    }
                                }
                            }
                        }
                        else
                            results[year] = {
                                ...results[year],
                                [month]: {
                                    [day]: {
                                        income: myIncome,
                                        increment: myIncrement
                                    }
                                }
                            }
                    } else {
                        results = {
                            ...results,
                            [year]: {
                                [month]: {
                                    [day]: {
                                        income: myIncome,
                                        increment: myIncrement
                                    }
                                }
                            }
                        }
                    }
                    return await results
                }, new Object())
                return res.status(200).json(results)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err.toString() })
            })
    })
    .get('/customer', verifyToken, (req, res) => {
        const customer = req.user
        exportOrderService.findByCustomerId(customer.id)
            .then(exportOrder => {
                res.status(200).json(exportOrder);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: err});
            })

    })
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