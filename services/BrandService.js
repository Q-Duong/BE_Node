const brand  = require("../models/BrandModel");

const create = (inputBrand)=>{
   return brand.create(inputBrand);
}

const findAll = () => {
    return brand.find({active:true})
}

const findDelete = () => {
    return brand.find({active:false})
}

const findPaginate = (paginationOption) => {
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

module.exports = {create , findAll, findDelete, findPaginate, findbyName, deleteOne, update, findWithoutActive }