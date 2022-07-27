const importOrder  = require("../models/ImportOrderModel");

const create = (inputImportOrder)=>{
   return importOrder.create(inputImportOrder);
}

const findAll = (paginationOption) => {
    return importOrder.paginate({active:true},paginationOption)
    .populate({
        path: 'details',
        populate: {path: 'product', select: 'name unit'},
    })
}

const deleteOne = (id) => {
    return importOrder.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputImportOrder) =>{
    return importOrder.findOneAndUpdate({_id: id},{...inputImportOrder}, {new:true});
}

module.exports = {create , findAll, deleteOne, update }