const customer  = require("../models/CustomerModel");

const create = (inputCustomer)=>{
   return customer.create({...inputCustomer});
}

const findAll = () => {
    return customer.find({})
}

const findbyName = (customerName) => {
    return customer.findOne({customerName})
}

const findByEmail = (email) =>{
    return customer.findOne({email})
}
 
const deleteOne = (id) => {
    return customer.findOneAndDelete({_id: id})
}
 
const update = (id, inputcustomer) =>{
    return customer.findOneAndUpdate({_id: id},{...inputcustomer});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail}