const category  = require("../models/CategoryModel");

const create = ({categoryName,categoryImage})=>{
   return category.create({categoryName, categoryImage});
}

const findAll = () => {
    return category.find({})
}

const findbyName = (categoryName) => {
    return category.findOne({categoryName})
}

const deleteOne = (id) => {
    return category.deleteOne({id})
}

const update = (id, inputcategory) =>{
    return category.findOneAndUpdate({_id: id},{...inputcategory});
}

module.exports = {create , findAll, findbyName, deleteOne, update }