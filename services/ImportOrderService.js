const importOrder = require("../models/ImportOrderModel");

const create = (inputImportOrder) => {
  return importOrder.create(inputImportOrder);
};

const findAll = () => {
  return importOrder
    .find({ active: true })
    .populate({
      path: "details",
      populate: { path: "product", select: "name unit" },
    })
    .populate({
      path: "supplier",
      select: "name",
    });
};

const findAllPaginate = (paginationOption) => {
  const aggregate = importOrder.aggregate([
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier",
        foreignField: "_id",
        as: "supplier",
      },
    },
    {
      $unwind: { path: "$supplier" },
    },

    {
      $lookup: {
        from: "importorderdetails",
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
    },
  ]);
  return importOrder.aggregatePaginate(aggregate, { ...paginationOption });
};

const deleteOne = (id) => {
  return importOrder.findOneAndUpdate({ _id: id }, { active: false });
};

const update = (id, inputImportOrder) => {
  return importOrder.findOneAndUpdate(
    { _id: id },
    { ...inputImportOrder },
    { new: true }
  );
};

module.exports = { create, findAll, findAllPaginate, deleteOne, update };
