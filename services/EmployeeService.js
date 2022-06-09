const employee  = require("../models/EmployeeModel");

const create = ({employeeName,employeePhone,employeeEmail,employeePassword,employeeRole,employeeActive})=>{
   return employee.create({employeeName, employeePhone, employeeEmail, employeePassword, employeeRole, employeeActive});
}

const findAll = () => {
    return employee.find({})
}

const findbyName = (employeeName) => {
    return employee.findOne({employeeName})
}

const findByEmail = (employeeEmail) =>{
    return employee.findOne({employeeEmail})
}

const deleteOne = (id) => {
    return employee.deleteOne({id})
}
 
const update = (id, inputemployee) =>{
    return employee.findOneAndUpdate({_id: id},{...inputemployee});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail}