const exportOrderDetails  = require("../models/ExportOrderDetailsModel");

const create = ({productSupplierId,productName,productQuantity,productPrice,Unit})=>{
   return exportOrderDetails.create({productSupplierId, productName, productQuantity, productPrice, Unit});
}

const findAll = () => {
    return exportOrderDetails.find({})
}

const findbyName = (exportOrderDetailsName) => {
    return exportOrderDetails.findOne({exportOrderDetailsName})
}

const deleteOne = (id) => {
    return exportOrderDetails.deleteOne({id})
}

const update = (id, inputexportOrderDetails) =>{
    return exportOrderDetails.findOneAndUpdate({_id: id},{...inputexportOrderDetails});
}

module.exports = {create , findAll, findbyName, deleteOne, update }