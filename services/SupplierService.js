const supplier  = require("../models/SupplierModel");

const create = async (inputSupplier)=>{
    try {
        const createdSupplier = await supplier.create(inputSupplier)
        if(createdSupplier)
            return supplier.populate(inputSupplier, {path: 'products'});
        else 
            return Promise.reject('Nhập nhà cung cấp không thành công')
    } catch (error) {
        return Promise.reject(error.toString())
    }
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
    return supplier.findOneAndUpdate({_id: id},{...inputSupplier}, {new: true}).populate('products');
}

const findbyId = (id) => {
    return supplier.findById(id)
}

module.exports = {create , findAll, findbyName, deleteOne, update, findbyId }