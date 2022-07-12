const {Router} = require('express')
const router = Router({mergeParams:true})

const {router:brandRouter} = require('./BrandRouters')
const {router:categoryRouter} = require('./CategoryRouters') 
const {router:customerRouter} = require('./CustomerRouters')
const {router:employeeRouter} = require('./EmployeeRouters')
const {router:exportOrderRouter} = require('./ExportOrderRouters')
const {router:importOrderRouter} = require('./ImportOrderRouters')
const {router:productRouter} = require('./ProductRouters')
const {router:supplierRouter} = require('./SupplierRouters')
const {router:warehouseRouter} = require('./WarehouseRouter')
const {router:permissionRouter} = require('./PermissionRouters')
const {router:roleRouter} = require('./RoleRouters')
const {router:collectionRouter} = require('./CollectionRouter')


router.use('/brand',brandRouter)
router.use('/category',categoryRouter)
router.use('/customer',customerRouter)
router.use('/employee',employeeRouter)
router.use('/exportOrder',exportOrderRouter)
router.use('/importOrder',importOrderRouter)
router.use('/product',productRouter)
router.use('/supplier',supplierRouter)
router.use('/warehouse',warehouseRouter)
router.use('/permission', permissionRouter)
router.use('/role', roleRouter)
router.use('/collection', collectionRouter)

module.exports = router