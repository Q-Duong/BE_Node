const importOrderDetails  = require("../models/ImportOrderDetailsModel");

const create = ({productSupplierId,productQuantity,productPrice})=>{
   return importOrderDetails.create({productSupplierId, productQuantity, productPrice});
}

const findAll = () => {
    return importOrderDetails.find({})
}

const findbyName = (importOrderDetailsId) => {
    return importOrderDetails.findOne({importOrderDetailsId})
}

const deleteOne = (id) => {
    return importOrderDetails.deleteOne({id})
}

const update = (id, inputimportOrderDetails) =>{
    return importOrderDetails.findOneAndUpdate({_id: id},{...inputimportOrderDetails});
}

module.exports = {create , findAll, findbyName, deleteOne, update }