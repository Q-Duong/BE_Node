const supplier  = require("../models/SupplierModel");

const create = (inputSupplier)=>{
   return supplier.create(inputSupplier);
}

const findAll = () => {
    return supplier.find({})
}

const findbyName = (name) => {
    return supplier.findOne({name})
}

const deleteOne = (id) => {
    return supplier.findOneAndDelete({_id: id})
}

const update = (id, inputSupplier) =>{
    return supplier.findOneAndUpdate({_id: id},{...inputSupplier});
}

const findbyId = (id) => {
    return supplier.findById(id)
}

module.exports = {create , findAll, findbyName, deleteOne, update, findbyId }