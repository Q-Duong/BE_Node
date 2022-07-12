const {Router} = require('express');
const customerService = require('../services/CustomerService');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/SignToken');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        const {name,email,phone, password} = req.body
        if(phone && email && name && password){
            customerService.findByPhone(phone)
                    .then(acc=>{
                        if(acc){
                            return Promise.reject(409)
                        } else 
                            return Promise.resolve()
                    })
                    .then(()=>{
                        return bcrypt.hash(password, 10)
                    })
                    .then(hashedPassword => {
                        return customerService.create({...req.body,password: hashedPassword})
                    })
                    .then(createdCustomer => {
                        const token = signToken(createdCustomer);
                        return res.status(201).json({accessToken: token})
                    })
                    .catch(err=> {
                        if(err === 409)
                            return res.status(409).json({message:"Customer was registered"})
                        else
                            return res.status(500).json(err)
                    })
        }
        else
            return res.status(400).json({message:"email, name, phone and password are empty"})
    })
    .post("/login",(req,res) => {
        const {phone, password} = req.body;
        if(phone && password) {
            customerService.findByPhone(phone)
                .then(customer => {
                    if(customer){
                        return Promise.all([bcrypt.compare(password,customer.password), Promise.resolve(customer)])
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
                    if(err === 400)
                        return res.status(400).json({message: "Invalid Credentials"})
                    return res.status(500).json(err)
                }) 
        } else {
            res.status(400).json({message: "phone and password are required"})
        }
    })
    .delete('/:id', (req,res)=>{
        customerService.deleteOne(req.params.id)
        .then(customer =>{
            res.status(200).json(customer);
        })
        .catch(err => {
            res.status(400).json({message: err});
        })
    })
    .put('/:id', (req,res)=>{        
        customerService.update(req.params.id, req.body)
            .then(createdAcc=>res.status(200).json(createdAcc))
            .catch(err => res.status(500).json({message:err}))
    })
    .get('/', (req,res)=>{
        customerService.findAll(req.body)
            .then(customers => {
                res.status(200).json(customers);
            })
            .catch(err => {
                res.status(500).json({message: err});
            })
    })

  
module.exports = {router}