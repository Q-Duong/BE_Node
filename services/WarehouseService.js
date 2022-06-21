const warehouse  = require("../models/warehouseModel");
const { checkExpireDate } = require("../utils/Moment");

const create = ({productId, supplierId, stockQuantity, soldPrice, stockPrice, expireIn })=>{
   return warehouse.create({product: productId, supplier: supplierId, stockPrice, stockQuantity, soldPrice,expireIn})
}

const findAll = () => {
    return warehouse.find({}).populate('product').populate('supplier')
}
const findByProductId = (productId) => {
    return warehouse.find({product: productId})
}

const findbyID = (id) => {
    return warehouse.findById(id).populate('product').populate('supplier')
}
const deleteOne = (id) => {
    return warehouse.deleteOne({id})
}

const update = (id, inputwarehouse) =>{
    return warehouse.findOneAndUpdate({_id: id},{...inputwarehouse});
}

const updateQuantity = ({id, quantity}) => {
    return warehouse.findOneAndUpdate({_id: id}, { $inc: {soldQuantity: quantity, stockQuantity: -quantity }});
}
module.exports = {create , findAll, deleteOne, update, findByProductId, findbyID, updateQuantity }