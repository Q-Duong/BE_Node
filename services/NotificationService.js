const notification = require('../models/NotificationModel')

const create = (inputNotification) => {
    return notification.create(inputNotification)
}

const findAll = () => {
    return notification.find({}).sort({createdAt: 1})
}

const findById = (id) => {
    return notification.findById(id)
}

const findByWarehouseOutOfStock = (warehouseId) => {
    return notification.findOne({warehouse: warehouseId, type: "OUT_OF_STOCK"})
}

const findByWarehouseExpire = (warehouseId) => {
    return notification.findOne({warehouse: warehouseId, type: "EXPIRE"})
}

const update = (id,inputNotification) => {
    return notification.findOneAndUpdate({_id:id},inputNotification,{new:true})
}

const updateIsRead = (id) => {
    return notification.findOneAndUpdate({_id:id},{isRead:true},{new:true})
}

const deleteOne = (id) => {
    return notification.findOneAndUpdate({_id:id},{active:false},{new:true})
}

module.exports = {findByWarehouseOutOfStock,findByWarehouseExpire, findAll, findById, create, update, updateIsRead, deleteOne}