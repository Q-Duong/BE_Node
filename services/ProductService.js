const product  = require("../models/ProductModel");

const create = async (inputProduct)=>{
       return product
        .populate(inputProduct, [{path: 'brand'},{path: 'category'}])
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
    return product.findOneAndUpdate({_id: id},{...inputProduct}, {new:true});
}


module.exports = {create , findAll, findbyName, deleteOne, update , findbyId}