const warehouseService = require('../services/WarehouseService')
const notificationService = require('../services/NotificationService')
async function checkCommingOutOfStockWarehouse() {
    try {
        let foundWarehouses = await warehouseService.findItemOutOfStock(10)
        const promiseCreateNotification  = await foundWarehouses.reduce(async (filterArr,warehouse) => {
            const isCheckedWarehouse = await notificationService.findByWarehouseOutOfStock(warehouse._id)
            const myArray = await filterArr
            if(!isCheckedWarehouse)
                myArray.push(notificationService.create({ warehouse, content: `lô hàng ${warehouse.product.name} còn dưới 10 món, vui lòng nhập thêm`, type: 'OUT_OF_STOCK' }))
            return myArray
        },[])

        return Promise.all(promiseCreateNotification)
    } catch (error) {
        console.log(error.toString())
    }
}

module.exports = checkCommingOutOfStockWarehouse