const {Router} = require('express');
const employee = require('../models/EmployeeModel');
const employeeService = require('../services/EmployeeService');
const md5 = require('md5')
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
            
        const {employeeName,employeePhone,employeeEmail,employeeRole,employeeActive,employeePassword} = req.body
        
        if(employeePassword != undefined ){
            const hashPassword = md5(employeePassword)
            employeeService.findByEmail(employeeEmail)
                .then(acc=>{
                    if(acc){
                        res.status(400).json({message:"Email is existing"})
                        return
                    }
                    return Promise.resolve(true)
                })
                .then(()=>{
                        employeeService.create({employeeEmail : employeeEmail, employeePassword : hashPassword, employeeName : employeeName, employeePhone : employeePhone, employeeRole : employeeRole, employeeActive : employeeActive})
                        .then(createdAcc=>res.status(201).json(createdAcc))
                        .catch(err => res.status(500).json({message:err}))
                })
                .catch(err=>res.status(500).json(err))
        }
        else
            return res.status(500).json({message:"password is empty"})
    })
    .get('/', (req,res)=>{
        
        employeeService.findAll(req.body)
            .then(employee => {
                res.status(200).json(employee);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        employeeService.deleteOne(req.params.id)
        .then(employee =>{
            res.status(200).json(employee);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        // const {employeeName,employeePhone,employeeAddress,employeeEmail,employeePassword,employeeActive} = req.body
        
        // const hashPassword = md5(employeePassword)

        // employeeService.update(req.params.id, req.body)
        //     .then(createdAcc=>res.status(200).json(createdAcc))
        //     .catch(err => res.status(500).json({message:err}))
    })
  
module.exports = {router}