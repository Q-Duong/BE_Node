const customer  = require("../models/CustomerModel");

const create = (inputCustomer)=>{
   return customer.create(inputCustomer);
}

const findAll = () => {
    return customer.find({active:true})
}

const findbyName = (name) => {
    return customer.findOne({name})
}

const findByEmail = (email) =>{
    return customer.findOne({email})
}

const findByPhone = (phone) => {
    return customer.findOne({phone})
}
 
const deleteOne = (id) => {
    return customer.findOneAndUpdate({_id: id},{active:false})
}
 
const update = (id, inputCustomer) =>{
    return customer.findOneAndUpdate({_id: id},{...inputCustomer}, {new:true});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail, findByPhone}