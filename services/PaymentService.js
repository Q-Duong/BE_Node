const payment  = require("../models/PaymentModel");

const create = ({type,momo,exportOrderId})=>{
   return payment.create({type, momo, exportOrderId});
}

const findAll = () => {
    return payment.find({})
}

const findbyName = (paymentName) => {
    return payment.findOne({paymentName})
}

const deleteOne = (id) => {
    return payment.deleteOne({id})
}

const update = (id, inputpayment) =>{
    return payment.findOneAndUpdate({_id: id},{...inputpayment});
}

module.exports = {create , findAll, findbyName, deleteOne, update }