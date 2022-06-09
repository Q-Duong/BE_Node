const {Router} = require('express');
const customer = require('../models/CustomerModel');
const customerService = require('../services/CustomerService');
const md5 = require('md5')
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
            
        const {customerName,customerPhone,customerAddress,customerEmail,customerPassword,customerActive} = req.body
        
        if(customerPassword != undefined ){
            const hashPassword = md5(customerPassword)
            customerService.findByEmail(customerEmail)
                    .then(acc=>{
                        if(acc){
                            res.status(400).json({message:"Email is existing"})
                            return
                        }
                        return Promise.resolve(true)
                    })
                    .then(()=>{
                        customerService.create({customerEmail : customerEmail, customerPassword : hashPassword, customerName : customerName, customerPhone : customerPhone, customerAddress : customerAddress, customerActive : customerActive})
                                    .then(createdAcc=>res.status(201).json(createdAcc))
                                    .catch(err => res.status(500).json({message:err}))
                    })
                    .catch(err=>res.status(500).json(err))
        }
        else
            return res.status(500).json({message:"password is empty"})
    })
    .get('/', (req,res)=>{
        
        customerService.findAll(req.body)
            .then(customer => {
                res.status(200).json(customer);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        customerService.deleteOne(req.params.id)
        .then(customer =>{
            res.status(200).json(customer);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        // const {customerName,customerPhone,customerAddress,customerEmail,customerPassword,customerActive} = req.body
        
        // const hashPassword = md5(customerPassword)

        // customerService.update(req.params.id, req.body)
        //     .then(createdAcc=>res.status(200).json(createdAcc))
        //     .catch(err => res.status(500).json({message:err}))
    })
  
module.exports = {router}