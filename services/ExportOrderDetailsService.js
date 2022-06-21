const exportOrderDetails  = require("../models/ExportOrderDetailsModel");

const create = (inputExportOrderDetail)=>{
   return exportOrderDetails.create(inputExportOrderDetail);
}

const findAll = () => {
    return exportOrderDetails.find({})
}

const deleteOne = (id) => {
    return exportOrderDetails.deleteOne({_id: id})
}

const update = (id, inputExportOrderDetails) =>{
    return exportOrderDetails.findOneAndUpdate({_id: id},{...inputExportOrderDetails});
}

module.exports = {create , findAll, deleteOne, update }