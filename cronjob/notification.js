const cron = require('node-cron')
const checkCommingOutOfStockWarehouse = require('../utils/CheckComingOutOfStockWarehouse')
const checkCommingExpireWarehouse = require('../utils/CheckCommingExpireWarehouse')

const schedule = cron.schedule('1 * * * * *', () => {
    console.log('this task runs after every minute')
    checkCommingExpireWarehouse()
    checkCommingOutOfStockWarehouse()
},
    {
        scheduled: false,
        timezone: "Asia/Ho_Chi_Minh"
    })

module.exports = schedule