const {Router} = require('express');
const customerService = require('../services/CustomerService');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/SignToken');
const nodemailer = require('nodemailer');
const { verifyToken } = require('../middlewares/auth');
const getPaginationOptions = require('../utils/GetPaginationOptions');
const router = Router({ mergeParams: true })

router
    .post('/', async (req,res) => {
         try{
            const {subject, name,content} = req.body

            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: 'phamanhtuan9a531@gmail.com', // generated ethereal user
                pass: 'icbbcivwahkzxhak'
              },
            });
            // send mail with defined transport object
            let info = await transporter.sendMail({
              to: "phamanhtuan9a531@gmail.com", // list of receivers
              subject, // Subject line
              html: `<p>${name} đã gửi với lời nhắn: ${content}</p>`
            });
            res.status(200).json({message: `cảm ơn bạn đã gửi lời nhắn đến chúng tôi`})
     
          } catch(err) {
            res.status(500).json({message: err.toString()})
          }
    })
module.exports = {router}