const { populate } = require("../models/ExportOrderModel");
const exportOrder  = require("../models/ExportOrderModel");

const create = (inputExportOrder)=>{
   return exportOrder.create(inputExportOrder);
}

const findAll = (paginationOption) => {
    return exportOrder.paginate({active:true},paginationOption)
    .populate({
        path: 'employee',
        select: 'name'
    })
    .populate({
        path: 'details',
        populate: {path: 'product', select: 'name unit'},
    })
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

module.exports = {create , findAll, deleteOne, update, findByCustomerId }