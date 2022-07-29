const { populate } = require("../models/ExportOrderModel");
const exportOrder  = require("../models/ExportOrderModel");

const create = (inputExportOrder)=>{
   return exportOrder.create(inputExportOrder);
}

const findAll = () => {
    return exportOrder.find({active:true})
    .populate({
        path: 'employee',
        select: 'name'
    })
    .populate({
        path: 'details',
        populate: {path: 'product', select: 'name unit'},
    })
}

const findById = (id) => {
    return exportOrder.findById(id)
}

const findByCustomerId = (customerId) => {
    return exportOrder.find({customer: customerId})
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
    return exportOrder.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputExportOrder) =>{
    return exportOrder.findOneAndUpdate({_id: id},{...inputExportOrder}, {new:true});
}

const updateStatus = (id, status) =>{
    return exportOrder.findOneAndUpdate({_id: id},{status}, {new:true});
}

module.exports = {create , findAll, deleteOne, update, findByCustomerId, findById,updateStatus }