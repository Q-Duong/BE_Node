const customer  = require("../models/CustomerModel");

const create = (inputCustomer)=>{
   return customer.create(inputCustomer);
}

const findAll = (paginationOption) => {
    return customer.paginate({active:true},paginationOption)
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

const updatePassword = (id,password) => {
    return customer.findOneAndUpdate({_id: id},{password}, {new:true});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail, findByPhone, updatePassword}