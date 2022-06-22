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

<<<<<<< HEAD
const update = (id, inputexportOrderDetails) =>{
    return exportOrderDetails.findOneAndUpdate({_id: id},{...inputexportOrderDetails}, {new:true});
=======
const update = (id, inputExportOrderDetails) =>{
    return exportOrderDetails.findOneAndUpdate({_id: id},{...inputExportOrderDetails});
>>>>>>> a55e7ff5f0cd73cc883e158b42e5464088cf316a
}

module.exports = {create , findAll, deleteOne, update }