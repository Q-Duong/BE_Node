const importOrder  = require("../models/ImportOrderModel");

const create = (inputImportOrder)=>{
   return importOrder.create(inputImportOrder);
}

const findAll = () => {
    return importOrder.find({})
    .populate({
        path: 'details',
        populate: {path: 'product', select: 'name unit'},
    })
}

const deleteOne = (id) => {
    return importOrder.deleteOne({id})
}

const update = (id, inputImportOrder) =>{
    return importOrder.findOneAndUpdate({_id: id},{...inputImportOrder});
}

module.exports = {create , findAll, deleteOne, update }