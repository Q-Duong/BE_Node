const payment  = require("../models/PaymentModel");

const create = (inputPayment)=>{
   return payment.create(inputPayment);
}

const findAll = () => {
    return payment.find({active:true})
}

const update = (id, inputpayment) =>{
    return payment.findOneAndUpdate({_id: id},{...inputpayment}, {new:true});
}
const updateStatus = (id, status) =>{
    return payment.findOneAndUpdate({_id: id},{status}, {new:true});
}
module.exports = {create , findAll, update ,updateStatus}