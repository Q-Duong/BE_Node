const { Router } = require('express');
const exportOrderService = require('../services/ExportOrderService');
const exportOrderDetailService = require('../services/ExportOrderDetailsService');
const paymentService = require('../services/PaymentService');
const warehouseService = require('../services/WarehouseService');
const { checkWarehouseQuantity } = require('../middlewares/checkWarehouseQuantity');
const { verifyToken, verifyByRole } = require('../middlewares/auth')
const { payMoMo } = require('../middlewares/payMoMo')
const getPaginationOptions = require('../utils/GetPaginationOptions')

const moment = require('moment');
const checkCustomerInfo = require('../middlewares/checkCustomerInfo');
const { signToken } = require('../utils/SignToken');

const router = Router({ mergeParams: true })

router
    .post('/', checkCustomerInfo, checkWarehouseQuantity, (req, res) => {
        const exportOrderData = req.body.exportOrder
        const purchaseProductDatas = req.body.purchaseProducts
        const customer = req.user
        const promiseCreateExportOrder = exportOrderService.create(
            {
                ...exportOrderData,
                customer: customer,
                customerName: exportOrderData.customer.name,
                customerEmail: exportOrderData.customer.email,
                customerPhone: exportOrderData.customer.phone
            })
        const promiseCreateExportOrderDetails = Promise.all(purchaseProductDatas.map(
            purchaseProductData => exportOrderDetailService.create({
                product: purchaseProductData.productId,
                productPrice: purchaseProductData.price,
                productQuantity: purchaseProductData.quantity
            })
        ))
        const promiseUpdateQuantityWarehouse = Promise.all(purchaseProductDatas.map(
            async purchaseProductData => {
                let commingToSoldQuantity = purchaseProductData.quantity
                const foundWarehouses = await warehouseService.findByProductIdAndNotExpire(purchaseProductData.productId)
                return Promise.all(foundWarehouses.reduce((arrPromise, warehouse) => {
                    const warehouseId = warehouse._id
                    if (commingToSoldQuantity <= 0)
                        return arrPromise
                    else if (warehouse.stockQuantity < commingToSoldQuantity) {
                        arrPromise.push(warehouseService.update(warehouseId,{
                            stockQuantity: 0,
                            soldQuantity: warehouse.soldQuantity + warehouse.stockQuantity,
                            soldPrice: purchaseProductData.price,
                            active: false
                        }))
                        commingToSoldQuantity -= warehouse.stockQuantity
                    }
                    else {
                        arrPromise.push(warehouseService.update(warehouseId,{
                            stockQuantity: warehouse.stockQuantity - commingToSoldQuantity,
                            soldQuantity: warehouse.soldQuantity + commingToSoldQuantity,
                            soldPrice: purchaseProductData.price,
                            active: commingToSoldQuantity === warehouse.stockQuantity ? false : true
                        }))
                        commingToSoldQuantity = 0
                    }
                    return arrPromise
                }, []))
            }
        ))

        const promiseCreatePayment = exportOrderData.paymentMethod === 'MOMO' ? paymentService.create({ type: "MoMo" }) : paymentService.create()

        Promise.all([promiseCreateExportOrder, promiseCreateExportOrderDetails, promiseCreatePayment, promiseUpdateQuantityWarehouse])
            .then(results => {
                results[0].details = results[1]
                results[0].save()
                results[2].exportOrder = results[0]
                results[2].save()
                const accessToken = signToken(customer, 'TOKEN')

                if (exportOrderData.paymentMethod === 'MOMO') {
                    req.exportOrder = results[0]
                    req.payment = results[2]
                    req.accessToken = accessToken
                    console.log(accessToken)
                    return payMoMo(req, res)
                } else
                    return res.status(201).json({ orderId: results[0]._id, accessToken })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ message: err })
            })
    })
    .get('/', (req, res) => {

        exportOrderService.findAll()
            .then(exportOrder => {
                res.status(200).json(exportOrder);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: err });
            })
    })
    .get('/admin', (req, res) => {
        const paginationOptions = getPaginationOptions(req)

        exportOrderService.findAllPaginate(paginationOptions)
            .then(exportOrder => {
                res.status(200).json(exportOrder);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: err });
            })
    })
    .get('/revenue', verifyToken, verifyByRole(['ADMIN']), (req, res) => {
        exportOrderDetailService.findAll()
            .then(async exportOrderDetail => {
                const results = await exportOrderDetail.reduce(async (revenueResults, exportOrderDetail) => {
                    let results = await revenueResults
                    const month = moment(exportOrderDetail.createdAt).month() + 1
                    const year = moment(exportOrderDetail.createdAt).year()
                    const day = moment(exportOrderDetail.createdAt).date()
                    const warehouse = await warehouseService.findByProductId(exportOrderDetail.product)
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
                res.status(400).json({ message: err });
            })

    })
    .patch('/:id', (req, res) => {
        exportOrderService.update(req.params.id, req.body)
            .then(exportOrder => {
                res.status(200).json(exportOrder)
            })
            .catch(err => {
                res.status(400).json({ message: 'gui lai request' })
            })
    })


module.exports = { router }