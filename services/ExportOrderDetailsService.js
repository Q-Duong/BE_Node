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

const update = (id, inputexportOrderDetails) =>{
    return exportOrderDetails.findOneAndUpdate({_id: id},{...inputexportOrderDetails}, {new:true});
}

module.exports = {create , findAll, deleteOne, update }