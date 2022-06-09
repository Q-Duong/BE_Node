const supplier  = require("../models/SupplierModel");

const create = ({supplierName,address,phone})=>{
   return supplier.create({supplierName, address, phone});
}

const findAll = () => {
    return supplier.find({})
}

const findbyName = (supplierName) => {
    return supplier.findOne({supplierName})
}

const deleteOne = (id) => {
    return supplier.deleteOne({id})
}

const update = (id, inputsupplier) =>{
    return supplier.findOneAndUpdate({_id: id},{...inputsupplier});
}


module.exports = {create , findAll, findbyName, deleteOne, update }