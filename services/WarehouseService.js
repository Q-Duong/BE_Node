const warehouse = require("../models/warehouseModel");
const mongoose = require('mongoose');
const { manufacturers } = require("googleapis/build/src/apis/manufacturers");

const create = ({ productId, supplierId, stockQuantity, soldPrice, stockPrice, expireIn, active }) => {
    return warehouse.create({ product: productId, supplier: supplierId, stockPrice, stockQuantity, soldPrice, expireIn, active })
}

const findAll = () => {
    return warehouse.find({ active: true }).sort({ soldPirce: -1 }).populate({
        path: 'product',
        populate: {
            path: 'brand',
            model: 'brand'
        }
    }).populate('supplier').sort({createdAt: -1})
}

const findAllWithoutActive = (filterOptions, paginationOption) => {
    const aggregate = warehouse.aggregate(filterOptions)
    return warehouse.aggregatePaginate(aggregate, { ...paginationOption, sort: {createdAt: -1, active: -1, product: 1 } })
}

const findByProductId = (productId) => {
    return warehouse.find({ product: productId, active: true })
}
const findByProductIdAndNotExpire = (productId) => {
    const now = new Date()
    return warehouse.find({
        product: productId,
        expireIn: {
            $gte: now
        }
    })
}

const findByProductIdWithoutActive = (productId) => {
    return warehouse.find({ product: productId })
}

const findItemOutOfStock = (limit) => {
    return warehouse.find({ stockQuantity: { $lt: limit } }).populate('product')
}

const findItemCommingExpire = (fromDate, toDate) => {
    return warehouse.find({
        expireIn: {
            $gte: fromDate,
            $lte: toDate
        }
    }).populate('product')
}

const findByProductIdWithActive = (warehouseId, productId) => {
    return warehouse.find({ _id: { $ne: warehouseId }, product: productId, active: true })
}

const findDuringMonth = (startDate, endDate) => {
    return warehouse.find({ manufacturingDate: { $gte: startDate }, manufacturingDate: { $lte: endDate } }).populate({ path: 'product', select: 'name' })
}

const findbyID = (id) => {
    return warehouse.findById(id).populate('product').populate('supplier')
}
const deleteOne = (id) => {
    return warehouse.findOneAndUpdate({ _id: id }, { active: false })
}

const update = (id, inputwarehouse) => {
    return warehouse.findOneAndUpdate({ _id: id }, { ...inputwarehouse }, { new: true }).populate('product');
}

const updateQuantity = ({ id, quantity }) => {
    return warehouse.findOneAndUpdate({ _id: id }, { $inc: { soldQuantity: quantity, stockQuantity: -quantity } });
}

const findBySearchTerm = (searchTerm) => {
    searchTerm = searchTerm.trim()
    const splitedWords = searchTerm.split(' ')
    const queryObj = splitedWords.map(word => ({
        'product.name': { $regex: `.*${word}.*`, $options: 'si' }
    }))
    return warehouse.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product',
                pipeline: [
                    {
                        $lookup: {
                            from: "brands",
                            localField: "brand",
                            foreignField: "_id",
                            as: "brand",
                        },
                    },
                    {
                        $unwind: { path: "$brand" },
                    },
                ],
            }
        },
        {
            $unwind: { path: '$product' }
        },
        {
            $match: {
                $or: [
                    { 'product.name': { $regex: `.*${searchTerm}.*`, $options: 'si' } },
                    { $and: queryObj }
                ],
                active: true
            }
        }
    ])
}
const findbyCategoryID = (categoryId) => {
    return warehouse.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product',
                pipeline: [
                    {
                        $lookup: {
                            from: "brands",
                            localField: "brand",
                            foreignField: "_id",
                            as: "brand",
                        },
                    },
                    {
                        $unwind: { path: "$brand" },
                    },
                ],
            }
        },
        {
            $unwind: { path: '$product' }
        },
        {
            $match: {
                'product.category': mongoose.Types.ObjectId(categoryId),
                active: true
            }
        }
    ])
}

const findAndSortBySoldQuantity = (limit) => {
    return warehouse.find({ active: true }).sort({ soldQuantity: -1 }).limit(limit).populate('product')
}

const findStatusDiscount = () => {
    return warehouse.find({ active: true }, { status: 'khuyến mãi' }).sort({ soldPirce: -1 }).populate('product')
}


module.exports = {
    create, findByProductIdWithoutActive, findDuringMonth, findAll, findAndSortBySoldQuantity, findItemCommingExpire, findItemOutOfStock, findAllWithoutActive, deleteOne, update, findByProductId, findbyID, updateQuantity, findBySearchTerm, findbyCategoryID, findByProductIdWithActive, findStatusDiscount, findByProductIdAndNotExpire


}
