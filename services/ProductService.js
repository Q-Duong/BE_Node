const product  = require("../models/ProductModel");

const create = async (inputProduct)=>{
    try {
        const createdProduct = await product.create(inputProduct)
        if(createdProduct)
            return product
            .populate(inputProduct, [{path: 'brand'},{path: 'category'}]);
        else 
            return Promise.reject('thêm sản phẩm không thành công')
    } catch (error) {
        return Promise.reject(error.toString())
    }
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
    return product.findOneAndUpdate({_id: id},{...inputProduct}, {new:true}).populate('brand').populate('category');
}


module.exports = {create , findAll, findbyName, deleteOne, update , findbyId }