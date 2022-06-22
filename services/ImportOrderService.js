const importOrder  = require("../models/ImportOrderModel");

const create = (inputImportOrder)=>{
   return importOrder.create(inputImportOrder);
}

const findAll = () => {
    return importOrder.find({})
}

const deleteOne = (id) => {
    return importOrder.deleteOne({id})
}

const update = (id, inputImportOrder) =>{
    return importOrder.findOneAndUpdate({_id: id},{...inputImportOrder}, {new:true});
}

module.exports = {create , findAll, deleteOne, update }