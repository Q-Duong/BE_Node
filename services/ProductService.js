const product  = require("../models/ProductModel");

const create = (inputProduct)=>{
   return product.create(inputProduct);
}

const findAll = () => {
    return product.find({}).populate('brand').populate('category')
}

const findbyName = (name) => {
    return product.findOne({name})
}

const findbyId = (id) => {
    return product.findById(id)
}

const deleteOne = (id) => {
    return product.findOneAndDelete({_id: id})
}

const update = (id, inputProduct) =>{
    return product.findOneAndUpdate({_id: id},{...inputProduct});
}

const findBySearchTerm = (searchTerm) => {
    return product.find({name: `/${searchTerm}/`}).populate('brand').populate('category')
}


module.exports = {create , findAll, findbyName, deleteOne, update , findbyId, findBySearchTerm }