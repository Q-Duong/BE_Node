const cron = require('node-cron')
const checkCommingOutOfStockWarehouse = require('../utils/comingOutOfStockWarehouse')

const schedule = cron.schedule('0 1 * * *',async () => {
    console.log('run at 1:00 AM')
    const createdNotifications = await checkCommingOutOfStockWarehouse()
    console.log(createdNotifications)
},
{
scheduled: false,
    timezone: "Asia/Ho_Chi_Minh"
})

module.exports = schedule