const { default: mongoose } = require("mongoose");
const comment = require("../models/CommentModel");

const create = (inputComment) => {
    return comment.create(inputComment);
}

const findByProductId = (productId) => {
    return comment.aggregate([
        {
            $lookup: {
                from: 'exportorders',
                localField: 'order',
                foreignField: '_id',
                as: 'order',
                pipeline: [
                    {
                        $lookup: {
                            from: "exportorderdetails",
                            localField: "details",
                            foreignField: "_id",
                            as: "details",
                        },
                    },
                    {
                        $unwind: '$details'
                    },
                    {
                        $match: { 'details.product': mongoose.Types.ObjectId(productId) }
                    }
                ]
            },
        },
        {
            $unwind: '$order'
        },
        {
            $match: {
                active: true,
            }
        },
        {
            $project: {
                star: 1,
                content: 1,
                createdAt: 1,
                _id: 1,
                "order.customerName": 1
            }
        }

    ])
}

module.exports = { create, findByProductId }