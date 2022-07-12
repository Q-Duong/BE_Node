const warehouseService= require('../services/WarehouseService');

async function checkActiveProduct(req,res,next) {
    try {
        const productId = req.query.productId
        const foundWarehouses = await warehouseService.findByProductIdWithActive(productId)
        console.log(foundWarehouses)
        if(foundWarehouses && foundWarehouses.length >0)
            return res.status(400).json({message: 'bạn đang có lô hàng với cùng sản phẩm đang bán'})
        else
            return next()
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}

module.exports = {checkActiveProduct}