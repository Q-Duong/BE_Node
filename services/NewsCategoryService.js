const newsCategory  = require("../models/NewsCategoryModel");

const create = (inputNewsCategory)=>{
   return newsCategory.create(inputNewsCategory);
}

const findAll = () => {
    return newsCategory.find({active:true})
}

const findbyName = (Name) => {
    return brand.findOne({brandName})
}

const deleteOne = (id) => {
    return brand.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputBrand) =>{
    return brand.findOneAndUpdate({_id: id},{...inputBrand}, {new:true});
}

module.exports = {create , findAll, findbyName, deleteOne, update }