const importOrder  = require("../models/ImportOrderModel");

const create = ({createAt,total,duration,loan,importOrderStatus,supplierId,importOrderDetails})=>{
   return importOrder.create({createAt, total, duration, loan, importOrderStatus, supplierId, importOrderDetails});
}

const findAll = () => {
    return importOrder.find({})
}

const findbyName = (importOrderName) => {
    return importOrder.findOne({importOrderName})
}

const deleteOne = (id) => {
    return importOrder.deleteOne({id})
}

const update = (id, inputimportOrder) =>{
    return importOrder.findOneAndUpdate({_id: id},{...inputimportOrder});
}

module.exports = {create , findAll, findbyName, deleteOne, update }