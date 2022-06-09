const {Router} = require('express');
const payment = require('../models/PaymentModel');
const paymentService = require('../services/PaymentService');
const router = Router({ mergeParams: true })

router
    .post('/', (req,res)=>{
        
        paymentService.create(req.body)
            .then(payment => {
                res.status(201).json(payment);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/', (req,res)=>{
        
        paymentService.findAll(req.body)
            .then(payment => {
                res.status(200).json(payment);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .delete('/:id', (req,res)=>{
        paymentService.deleteOne(req.params.id)
        .then(payment =>{
            res.status(200).json(payment);
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'});
        })
    })
    .put('/:id', (req,res)=>{
        paymentService.update(req.params.id, req.body)
        .then(payment =>{
            res.status(200).json(payment)
        })
        .catch(err => {
            res.status(400).json({message: 'gui lai request'})
        })
    })
  

module.exports = {router}