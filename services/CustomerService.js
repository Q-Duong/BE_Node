const customer  = require("../models/CustomerModel");

const create = (inputCustomer)=>{
   return customer.create(inputCustomer);
}

const findAll = () => {
    return customer.find({})
}

const findbyName = (name) => {
    return customer.findOne({name})
}

const findByEmail = (email) =>{
    return customer.findOne({email})
}
 
const deleteOne = (id) => {
    return customer.deleteOne({id})
}
 
const update = (id, inputCustomer) =>{
    return customer.findOneAndUpdate({_id: id},{...inputCustomer});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail}