const moment = require('moment')
const warehouseService = require('../services/WarehouseService')
const notificationService = require('../services/NotificationService')
async function checkCommingExpireWarehouse() {
    try {
        const fromDate = moment().toDate()
        const toDate = moment(fromDate).add(7, 'days').toDate()
        let foundWarehouses = await warehouseService.findItemCommingExpire(fromDate, toDate)

        const promiseCreateNotification = await foundWarehouses.reduce(async (filterArr, warehouse) => {
            const isFound = await notificationService.findByWarehouseExpire(warehouse._id)
            const myArray = await filterArr
            if(!isFound)
                myArray.push(notificationService.create({ warehouse, content: `lô hàng ${warehouse.product.name} của bạn sắp hết hạn`, type: 'EXPIRE' })
                )
            return myArray
        }, [])

        return Promise.all(promiseCreateNotification)
    } catch (error) {
        console.log(error.toString())
    }
}

module.exports = checkCommingExpireWarehouse