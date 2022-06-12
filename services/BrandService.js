const brand  = require("../models/BrandModel");

const create = ({brandName,brandImage})=>{
   return brand.create({brandName, brandImage});
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

const update = (id, inputbrand) =>{
    return brand.findOneAndUpdate({_id: id},{...inputbrand});
}

module.exports = {create , findAll, findbyName, deleteOne, update }