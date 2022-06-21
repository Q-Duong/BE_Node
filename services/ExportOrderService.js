const { populate } = require("../models/ExportOrderModel");
const exportOrder  = require("../models/ExportOrderModel");

const create = (inputExportOrder)=>{
   return exportOrder.create(inputExportOrder);
}

const findAll = () => {
    return exportOrder.find({})
    .populate({
        path: 'employee',
        select: 'name'
    })
    .populate({
        path: 'details',
        populate: {path: 'product', select: 'name unit'},
    })
}

const deleteOne = (id) => {
    return exportOrder.deleteOne({id})
}

const update = (id, inputExportOrder) =>{
    return exportOrder.findOneAndUpdate({_id: id},{...inputExportOrder});
}

module.exports = {create , findAll, deleteOne, update }