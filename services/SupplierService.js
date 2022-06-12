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
    return supplier.findOneAndDelete({_id: id})
}

const update = (id, inputsupplier) =>{
    return supplier.findOneAndUpdate({_id: id},{...inputsupplier});
}

const findbyID = (id) => {
    return supplier.findById(id)
}

module.exports = {create , findAll, findbyName, deleteOne, update, findbyID }