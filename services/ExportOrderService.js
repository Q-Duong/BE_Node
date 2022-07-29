const { populate } = require("../models/ExportOrderModel");
const exportOrder  = require("../models/ExportOrderModel");

const create = (inputExportOrder)=>{
   return exportOrder.create(inputExportOrder);
}

const findAll = () => {
    return exportOrder.find({active:true},)
    .populate({
        path: 'employee',
        select: 'name'
    })
    .populate({
        path: 'details',
        populate: {path: 'product', select: 'name unit'},
    })
    .populate({
        path: 'customer',
        populate: {path: 'customer', select: 'name phone'},
    })
}

const findAllPaginate = (paginationOption) => {
    const aggregate = exportOrder.aggregate(
        [
            
            {
                $lookup:{
                from: 'employees',
                localField: 'employee',
                foreignField: '_id',
                as: 'employee'
                }
            },
                
            {
                $lookup:{
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'customer'
                }
                
            },
            {
                $unwind: { path: "$customer" },
            },
            {
                $lookup: {
                    from: "exportorderdetails",
                    localField: "details",
                    foreignField: "_id",
                    as: "details",
                    pipeline: [
                    {
                        $lookup: {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "product",
                        },
                    },
                    {
                        $unwind: { path: "$product" },
                    },
                    ],
                },
            }
            
        ]
    )
    return exportOrder.aggregatePaginate(aggregate,{...paginationOption})
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

module.exports = {create , findAll, findAllPaginate, deleteOne, update, findByCustomerId }