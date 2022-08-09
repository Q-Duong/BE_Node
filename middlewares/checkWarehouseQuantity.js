const warehouseService  = require('../services/WarehouseService')

async function checkWarehouseQuantity(req,res,next) {
    try {
        const purchasedProductDatas = req.body.purchaseProducts
        const promiseCheckQuantity = purchasedProductDatas.map(async purchasedProductData => {
            const foundWarehouses = await warehouseService.findByProductIdAndNotExpire(purchasedProductData.productId)
            console.log(foundWarehouses.reduce((total,warehouse) => total+warehouse.stockQuantity,0))
            if(foundWarehouses.reduce((total,warehouse) => total+warehouse.stockQuantity,0) < purchasedProductData.quantity)
                return Promise.reject(400)
            else 
                return Promise.resolve()
        })
        await Promise.all(promiseCheckQuantity)
        return next()
    } catch (error) {
        if(error === 400)
            return res.status(400).json({message: 'your products are not enought'})
        return res.status(500).json({message: error.toString()})
    }
    
}

module.exports = {checkWarehouseQuantity}