const importOrderDetails  = require("../models/ImportOrderDetailsModel");

const create = ({productId,productQuantity,productPrice})=>{
   return importOrderDetails.create({product:productId, productQuantity, productPrice});
}

const findAll = () => {
    return importOrderDetails.find({active:true})
}

const findbyName = (importOrderDetailsId) => {
    return importOrderDetails.findOne({importOrderDetailsId})
}

const deleteOne = (id) => {
    return importOrderDetails.findOneAndUpdate({_id: id},{active:false})
}

const update = (id, inputimportOrderDetails) =>{
    return importOrderDetails.findOneAndUpdate({_id: id},{...inputimportOrderDetails}, {new:true});
}

module.exports = {create , findAll, findbyName, deleteOne, update }