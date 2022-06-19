const payment  = require("../models/PaymentModel");

const create = (inputPayment)=>{
   return payment.create(inputPayment);
}

const findAll = () => {
    return payment.find({})
}

const update = (id, inputpayment) =>{
    return payment.findOneAndUpdate({_id: id},{...inputpayment});
}

module.exports = {create , findAll, update }