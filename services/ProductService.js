const product = require("../models/ProductModel");

const create = async (inputProduct) => {
  try {
    const createdProduct = await product.create(inputProduct);
    if (createdProduct)
      return product.populate(inputProduct, [
        { path: "brand" },
        { path: "category" },
      ]);
    else return Promise.reject("thêm sản phẩm không thành công");
  } catch (error) {
    return Promise.reject(error.toString());
  }
};

const findAll = () => {
  return product.find({ active: true }).populate("brand").populate("category");
};

const findAllPaginate = (paginationOption) => {
  const aggregate = product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      }
    },
    { 
        $unwind: { path: "$category" } 
    },
    {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        }
      },
      { 
          $unwind: { path: "$brand" } 
      }
  ]);
  return product.aggregatePaginate(aggregate, { ...paginationOption });
};

const findbyName = (name) => {
  return product.findOne({ name });
};

const findbyId = (id) => {
  return product.findById(id);
};

const deleteOne = (id) => {
  return product.findOneAndUpdate({ _id: id }, { active: false });
};

const update = (id, inputProduct) => {
  return product
    .findOneAndUpdate({ _id: id }, { ...inputProduct }, { new: true })
    .populate("brand")
    .populate("category");
};

module.exports = {
  create,
  findAll,
  findAllPaginate,
  findbyName,
  deleteOne,
  update,
  findbyId,
};
