const warehouse  = require("../models/warehouseModel");
const mongoose = require('mongoose')

const create = ({productId, supplierId, stockQuantity, soldPrice, stockPrice, expireIn,active })=>{
   return warehouse.create({product: productId, supplier: supplierId, stockPrice, stockQuantity, soldPrice,expireIn, active})
}

const findAll = () => {
    return warehouse.find({active:true}).sort({soldPirce: -1}).populate('product').populate('supplier')
}

const findAllWithoutActive = (filterOptions,paginationOption) => {
    const aggregate = warehouse.aggregate(filterOptions)
    return warehouse.aggregatePaginate(aggregate,{...paginationOption,sort:{active: -1, product: 1}})
}

const findByProductId = (productId) => {
    return warehouse.find({product: productId,active: true})
}

const findByProductIdWithoutActive = (productId) => {
    return warehouse.find({product: productId})
}

const findItemOutOfStock = (limit) => {
    return warehouse.find({stockQuantity: {$lt: limit}}).populate('product')
}

const findItemCommingExpire = (fromDate,toDate) => {
    return warehouse.find({expireIn: { 
        $gte: fromDate,
        $lte: toDate
    }}).populate('product')
}

const findByProductIdWithActive = (productId) => {
    return warehouse.find({product: productId, active: true})
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
    const splitedWords = searchTerm.split(' ')
    const queryObj = splitedWords.map(word => ({
        'product.name': {$regex: `.*${word}.*`, $options: 'si' }
    }))
    queryObj.push({'product.name': {$regex: `.*${searchTerm}.*`, $options: 'si' }})
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
                $or: queryObj,
                active: true
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
                'product.category': mongoose.Types.ObjectId(categoryId),
                active: true
            }
        }
    ])
}

const findAndSortBySoldQuantity = (limit) => {
    return warehouse.find({active: true}).sort({soldQuantity: -1}).limit(limit).populate('product')
}

const findStatusDiscount = () => {
    return warehouse.find({active:true},{status:'khuyến mãi'}).sort({soldPirce: -1}).populate('product')
}


module.exports = {create ,findByProductIdWithoutActive, findAll,findAndSortBySoldQuantity,findItemCommingExpire, findItemOutOfStock,  findAllWithoutActive, deleteOne, update, findByProductId, findbyID, updateQuantity, findBySearchTerm, findbyCategoryID, findByProductIdWithActive, findStatusDiscount }
