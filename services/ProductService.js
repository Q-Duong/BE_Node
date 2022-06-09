const product  = require("../models/ProductModel");

const create = ({productName,productImage,unit,productStatus,categoryId,brandId})=>{
   return product.create({productName, productImage, unit, productStatus, categoryId, brandId});
}

const findAll = () => {
    return product.find({})
}

const findbyName = (productName) => {
    return product.findOne({productName})
}

const deleteOne = (id) => {
    return product.deleteOne({id})
}

const update = (id, inputproduct) =>{
    return product.findOneAndUpdate({_id: id},{...inputproduct});
}


module.exports = {create , findAll, findbyName, deleteOne, update }