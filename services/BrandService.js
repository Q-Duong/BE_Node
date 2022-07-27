const brand  = require("../models/BrandModel");

const create = (inputBrand)=>{
   return brand.create(inputBrand);
}

const findAll = (paginationOption) => {
    return brand.paginate({active:true},paginationOption)
}

const findbyName = (brandName) => {
    return brand.findOne({brandName})
}

const findWithoutActive = () => {
    return brand.fill({active:false})
}

const deleteOne = (id) => {
    return brand.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputBrand) =>{
    return brand.findOneAndUpdate({_id: id},{...inputBrand}, {new:true});
}

module.exports = {create , findAll, findbyName, deleteOne, update, findWithoutActive }