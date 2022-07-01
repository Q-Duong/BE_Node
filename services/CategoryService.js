const category  = require("../models/CategoryModel");

const create = (inputCategory)=>{
   return category.create(inputCategory);
}

const findAll = () => {
    return category.find({active:true})
}

const findbyName = (name) => {
    return category.findOne({name})
}

const deleteOne = (id) => {
    return category.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputCategory) =>{
    return category.findOneAndUpdate({_id: id},{...inputCategory}, {new:true});
}

module.exports = {create , findAll, findbyName, deleteOne, update }