const exportOrder  = require("../models/ExportOrderModel");

const create = ({createAt,total,exportOrderStatus,employeeId,customerId})=>{
   return exportOrder.create({createAt, total, exportOrderStatus, employeeId, customerId});
}

const findAll = () => {
    return exportOrder.find({})
}

const findbyName = (exportOrderName) => {
    return exportOrder.findOne({exportOrderName})
}

const deleteOne = (id) => {
    return exportOrder.deleteOne({id})
}

const update = (id, inputexportOrder) =>{
    return exportOrder.findOneAndUpdate({_id: id},{...inputexportOrder});
}

module.exports = {create , findAll, findbyName, deleteOne, update }