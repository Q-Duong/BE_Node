const brand  = require("../models/BrandModel");

const create = (inputBrand)=>{
   return brand.create(inputBrand);
}

const findAll = () => {
    return brand.find({})
}

const findbyName = (brandName) => {
    return brand.findOne({brandName})
}

const deleteOne = (id) => {
    return brand.findOneAndDelete({_id: id})
}

const update = (id, inputBrand) =>{
    return brand.findOneAndUpdate({_id: id},{...inputbrand}, {new:true});
}

module.exports = {create , findAll, findbyName, deleteOne, update }