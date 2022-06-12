const {Router} = require('express')
const router = Router({mergeParams:true})

const {router:brandRouter} = require('./BrandRouters')
const {router:categoryRouter} = require('./CategoryRouters') 
const {router:customerRouter} = require('./CustomerRouters')
const {router:employeeRouter} = require('./EmployeeRouters')
// const {router:exportOrderDetailsRouter} = require('./ExportOrderDetailsRouters')
// const {router:exportOrderRouter} = require('./ExportOrderRouters')
// const {router:importOrderDetailsRouter} = require('./ImportOrderDetailsRouters')
// const {router:importOrderRouter} = require('./ImportOrderRouters')
// const {router:paymentRouter} = require('./PaymentRouters')
const {router:productRouter} = require('./ProductRouters')
const {router:supplierRouter} = require('./SupplierRouters')
const {router:warehouseRouter} = require('./WarehouseRouter')


router.use('/brand',brandRouter)
router.use('/category',categoryRouter)
router.use('/customer',customerRouter)
router.use('/employee',employeeRouter)
// router.use('/exportOrderDetails',exportOrderDetailsRouter)
// router.use('/exportOrder',exportOrderRouter)
// router.use('/importOrderDetails',importOrderDetailsRouter)
// router.use('/importOrder',importOrderRouter)
// router.use('/payment',paymentRouter)
router.use('/product',productRouter)
router.use('/supplier',supplierRouter)
router.use('/warehouse',warehouseRouter)
module.exports = router