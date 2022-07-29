const {Router} = require('express');
const employeeService = require('../services/EmployeeService');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/SignToken');
const getPaginationOptions = require('../utils/GetPaginationOptions');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        const {name,phone,email,active,password,role} = req.body
        
        if(password != undefined ){
            employeeService.findByEmail(email)
                .then(acc=>{
                    if(acc){
                        res.status(400).json({message:"Email is existing"})
                        return
                    }
                    return bcrypt.hash(password, 10)
                })
                .then((result)=>{
                    return employeeService.create({
                        email,
                        name, 
                        phone, 
                        active,
                        role,
                        password : result, 
                    })
                        .then(createdEmployee => {
                            const token = signToken(createdEmployee);
                            return res.status(201).json({accessToken: token})
                        })
                    .catch(err => res.status(500).json({message:err}))
                })
                .catch(err=>res.status(500).json(err))
        }
        else
            return res.status(500).json({message:"password is empty"})
    })
    .post("/login",(req,res) => {
        const {email, password} = req.body;
        if(email && password) {
            employeeService.findByEmail(email)
                .then(employee => {
                   
                    if(employee){
                        return Promise.all([bcrypt.compare(password,employee.password), Promise.resolve(employee)])
                    }
                    else 
                        return Promise.reject(400)
                })
                .then(result => {
                    if(result[0]) {
                        const token = signToken(result[1])
                        return res.status(200).json({accessToken: token})
                    } else {
                        return Promise.reject(400)
                    }
                })
                .catch(err => {
                    console.log(err)
                    if(err === 400)
                        return res.status(400).json({message: "Invalid Credentials"})
                    return res.status(500).json(err)
                }) 
        } else {
            res.status(400).json({message: "email and password are required"})
        }
    })
    .get('/', (req,res)=>{
        
        employeeService.findAll(req.body)
            .then(category => {
                res.status(200).json(category);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/admin', (req,res)=>{
        const paginationOptions = getPaginationOptions(req)

        employeeService.findPaginate(paginationOptions)
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
            res.status(400).json({message: err});
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