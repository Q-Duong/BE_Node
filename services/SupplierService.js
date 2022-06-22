const supplier  = require("../models/SupplierModel");

const create = (inputSupplier)=>{
   return supplier.populate(inputSupplier, {path: 'products'});
}

const findAll = () => {
    return supplier.find({}).populate('products')
}

const findbyName = (name) => {
    return supplier.findOne({name})
}

const deleteOne = (id) => {
    return supplier.findOneAndDelete({_id: id})
}

const update = (id, inputSupplier) =>{
    return supplier.findOneAndUpdate({_id: id},{...inputSupplier}, {new:true});
}

const findbyId = (id) => {
    return supplier.findById(id)
}

module.exports = {create , findAll, findbyName, deleteOne, update, findbyId }