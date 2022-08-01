const {Router} = require('express');
const customerService = require('../services/CustomerService');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/SignToken');
const nodemailer = require('nodemailer');
const { verifyToken } = require('../middlewares/auth');
const getPaginationOptions = require('../utils/GetPaginationOptions');
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
                        const token = signToken(createdCustomer,'TOKEN');
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
        console.log(phone, password)
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
    .post('/forgotpassword', async (req,res) => {
         try{
            const {fromEmail} = req.body
            const foundCustomer = await customerService.findByEmail(fromEmail)
            if(!foundCustomer)
                return res.status(400).json({message: 'email is invalid'})
            const token = signToken(foundCustomer)

            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'huynhquocduong789@gmail.com', // generated ethereal user
                pass: 'vqecmhlvgbsmhdvt'
              },
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Lão tôn 👻" <huynhquocduong789@gmail.com>', // sender address
              to: fromEmail, // list of receivers
              subject: "Forgot password", // Subject line
              html: `<h1>If you wanna to create new password please <a href="http://127.0.0.1:3000/updatepassword?token=${token}">click here</a>`, // html body
            });
            res.status(200).json({message: `Vui long kiểm tra tài khoản gmail ${fromEmail} để thực hiện tạo mật khẩu mới`})
            
          } catch(err) {
            res.status(500).json({message: err.toString()})
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
    .patch('/password',verifyToken, async (req,res) => {
        try {
            const {newPassword} = req.body
            const hashedPassword =  await bcrypt.hash(newPassword,10)
            const updatedCustomer = await customerService.updatePassword(req.user.id, hashedPassword)
            res.json({message: 'update password successfully'})
        } catch (error) {
            res.status(500).json({message: error.toString()})
        }
    })
    .get('/', (req,res)=>{
        
        customerService.findAll(req.body)
            .then(category => {
                res.status(200).json(category);
            })
            .catch(err => {
                res.status(400).json({message: err});
            })
    })
    .get('/admin', (req,res)=>{
        const paginationOptions = getPaginationOptions(req)

        customerService.findPaginate(paginationOptions)
            .then(customers => {
                res.status(200).json(customers);
            })
            .catch(err => {
                res.status(500).json({message: err});
            })
    })
    .get('/info', verifyToken,async (req,res) => {
        try {
            const foundCustomer =  await customerService.findByEmail(req.user.email)
            delete foundCustomer['password']
            res.status(200).json(foundCustomer)
        } catch (error) {
            res.status(500).json({message: error.toString()})
        }  
    })

  
module.exports = {router}