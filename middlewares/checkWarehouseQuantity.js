const warehouseService  = require('../services/WarehouseService')

function checkWarehouseQuantity(req,res,next) {
    const purchasedProductDatas = req.body.purchaseProducts
    purchasedProductDatas.forEach(async purchasedProductData => {
        const foundWarehouse = await warehouseService.findbyID(purchasedProductData.warehouseId)
        if(foundWarehouse.stockQuantity < purchasedProductData.quantity)
            return res.status(400).json({message: "product is not enought to sell"})
    })
    return next()
}

module.exports = {checkWarehouseQuantity}