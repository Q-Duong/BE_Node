const supplier  = require("../models/SupplierModel");
const mongoose = require('mongoose');

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
    return supplier.find({active:true}).populate('products')
}

const findAllPaginate = (paginationOption) => {
    const aggregate = supplier.aggregate(
        [
            {
                $lookup:{
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'products'
                }
            }
        ]
    )
    return supplier.aggregatePaginate(aggregate,{...paginationOption})
}

const findbyName = (name) => {
    return supplier.findOne({name})
}

const deleteOne = (id) => {
    return supplier.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputSupplier) =>{
    return supplier.findOneAndUpdate({_id: id},{...inputSupplier}, {new: true}).populate('products');
}

const findbyId = (id) => {
    return supplier.findById(id)
}



module.exports = {create , findAll, findbyName, deleteOne, update, findbyId, findAllPaginate }