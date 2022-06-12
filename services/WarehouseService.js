const warehouse  = require("../models/warehouseModel");

const create = (inputWarehouse)=>{
   return warehouse.create(inputWarehouse).populate('product').populate('supplier')
}

const findAll = () => {
    return warehouse.find({}).populate('product').populate('supplier')
}
const findbyProductIDAndExpireIn = ({product, expireIn}) => {
    return warehouse.findOne({product, expireIn})
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

module.exports = {create , findAll, deleteOne, update, findbyProductIDAndExpireIn, findbyID }