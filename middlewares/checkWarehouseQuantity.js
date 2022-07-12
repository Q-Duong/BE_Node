const warehouseService  = require('../services/WarehouseService')

async function checkWarehouseQuantity(req,res,next) {
    try {
        const purchasedProductDatas = req.body.purchaseProducts
        purchasedProductDatas.forEach(async purchasedProductData => {
        const foundWarehouse = await warehouseService.findbyID(purchasedProductData.warehouseId)
        if(foundWarehouse.stockQuantity < purchasedProductData.quantity)
            return res.status(400).json({message: "product is not enought to sell"})
        return next()
    })
    } catch (error) {
        return res.status(500).json({message: error.toString()})
    }
    
}

module.exports = {checkWarehouseQuantity}