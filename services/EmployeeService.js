const employee  = require("../models/EmployeeModel");

const create = (inputEmployee)=>{
   return employee.create(inputEmployee);
}

const findAll = () => {
    return employee.find({})
}

const findbyName = (name) => {
    return employee.findOne({name})
}

const findByEmail = (email) =>{
    return employee.findOne({email})
}

const deleteOne = (id) => {
    return employee.findOneAndDelete({_id: id})
}
 
const update = (id, inputEmployee) =>{
    return employee.findOneAndUpdate({_id: id},{...inputEmployee}, {new:true});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail}