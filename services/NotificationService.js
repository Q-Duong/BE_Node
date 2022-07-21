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

const findByWarehouseId = (warehouseId) => {
    return notification.findOne({warehouse: warehouseId})
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

module.exports = {findByWarehouseId, findAll, findById, create, update, updateIsRead, deleteOne}