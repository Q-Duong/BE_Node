const warehouse  = require("../models/warehouseModel");
const { checkExpireDate } = require("../utils/Moment");
const mongoose = require('mongoose')

const create = ({productId, supplierId, stockQuantity, soldPrice, stockPrice, expireIn })=>{
   return warehouse.create({product: productId, supplier: supplierId, stockPrice, stockQuantity, soldPrice,expireIn})
}

const findAll = () => {
    return warehouse.find({active:true}).populate('product').populate('supplier')
}
const findByProductId = (productId) => {
    return warehouse.find({product: productId})
}

const findbyID = (id) => {
    return warehouse.findById(id).populate('product').populate('supplier')
}
const deleteOne = (id) => {
    return warehouse.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputwarehouse) =>{
    return warehouse.findOneAndUpdate({_id: id},{...inputwarehouse}, {new:true}).populate('product');
}

const updateQuantity = ({id, quantity}) => {
    return warehouse.findOneAndUpdate({_id: id}, { $inc: {soldQuantity: quantity, stockQuantity: -quantity }});
}

const findBySearchTerm = (searchTerm) => {
    searchTerm = searchTerm.trim()
    return warehouse.aggregate([
        {
            $lookup:{
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: {path:'$product'}
        },
        {
            $match:{
                'product.name': {$regex: `.*${searchTerm}.*`, $options: 'si' }
            }
        }
    ])
}
const findbyCategoryID = (categoryId) => {
    return warehouse.aggregate([
        {
            $lookup:{
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: {path:'$product'}
        },
        {
            $match:{
                'product.category': mongoose.Types.ObjectId(categoryId)
            }
        }
    ])
}

module.exports = {create , findAll, deleteOne, update, findByProductId, findbyID, updateQuantity, findBySearchTerm, findbyCategoryID }