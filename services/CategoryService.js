const category  = require("../models/CategoryModel");

const create = (inputCategory)=>{
   return category.create(inputCategory);
}

const findAll = () => {
    return category.find({})
}

const findbyName = (name) => {
    return category.findOne({name})
}

const deleteOne = (id) => {
    return category.findOneAndDelete({_id: id})
}

const update = (id, inputCategory) =>{
    return category.findOneAndUpdate({_id: id},{...inputCategory});
}

module.exports = {create , findAll, findbyName, deleteOne, update }