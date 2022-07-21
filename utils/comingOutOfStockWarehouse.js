const warehouseService = require('../services/WarehouseService')
const notificationService = require('../services/NotificationService')
async function checkCommingOutOfStockWarehouse() {
    try {
        let foundWarehouses = await warehouseService.findItemOutOfStock()
        foundWarehouses = foundWarehouses.filter(async warehouse =>{
            const isCheckedWarehouse = await notificationService.findByWarehouseId(warehouse._id)
            return !isCheckedWarehouse
        })
        const promiseCreateNotification = foundWarehouses.map(warehouse => {
            return notificationService.create({warehouse, content: `your lô hàng ${warehouse.product.name} is comming out of stock`})
        })
        return Promise.all(promiseCreateNotification)
    } catch (error) {
        console.log(error.toString())
    }
}

module.exports = checkCommingOutOfStockWarehouse