const exportOrder  = require("../models/ExportOrderModel");

const create = (inputExportOrder)=>{
   return exportOrder.create(inputExportOrder);
}

const findAll = () => {
    return exportOrder.find({})
}

const deleteOne = (id) => {
    return exportOrder.deleteOne({id})
}

const update = (id, inputExportOrder) =>{
    return exportOrder.findOneAndUpdate({_id: id},{...inputExportOrder}, {new:true});
}

module.exports = {create , findAll, deleteOne, update }