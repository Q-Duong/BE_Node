const employee  = require("../models/EmployeeModel");

const create = async (inputEmployee)=>{
    try {
        const createdEmployee = await employee.create(inputEmployee)
        if(createdEmployee)
            return employee
            .populate(inputEmployee, 
                {
                    path: 'role',
                    select: 'title _id',
                    populate: {
                        path: 'permissions',
                        select: 'title _id'
                    }
                }
            );
        else 
            return Promise.reject('thêm nhân viên không thành công')
    } catch (error) {
        return Promise.reject(error.toString())
    }
}

const findAll = () => {
    return employee.find({active:true})
}

const findbyName = (name) => {
    return employee.findOne({name})
}

const findByEmail = (email) =>{
    return employee.findOne({email}).populate({
        path: 'role',
        select: 'title _id',
        populate: {
            path: 'permissions',
            select: 'title _id'
        }
    })
}

const deleteOne = (id) => {
    return employee.findOneAndUpdate({_id: id},{active:false})
}
 
const update = (id, inputEmployee) =>{
    return employee.findOneAndUpdate({_id: id},{...inputEmployee}, {new:true});
}
 
module.exports = {create , findAll, findbyName, deleteOne, update ,findByEmail}