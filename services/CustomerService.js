const customer  = require("../models/CustomerModel");

const create = ({customerName,customerPhone,customerAddress,customerEmail,customerPassword,customerActive})=>{
   return customer.create({customerName, customerPhone, customerAddress, customerEmail, customerPassword, customerActive});
}

const findAll = () => {
    return customer.find({})
}

const findbyName = (customerName) => {
    return customer.findOne({customerName})
}

const findByEmail = (customerEmail) =>{
    return customer.findOne({customerEmail})
}
 
const deleteOne = (id) => {
    return customer.deleteOne({id})
}
 
const update = (id, inputcustomer) =>{
    return customer.findOneAndUpdate({_id: id},{...inputcustomer});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail}