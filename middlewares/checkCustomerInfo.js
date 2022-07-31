const customerService = require('../services/CustomerService')
const bcrypt = require('bcrypt');

async function checkCustomerInfo(req, res, next) {
    try {
        const { name, email, phone } = req.body.exportOrder.customer
        if (!name || !email || !phone)
            return res.status(400).json({ message: `email, phone, name are empty` })
    
        const customer = await customerService.findByPhone(phone)
        if (customer) {
            req.user = customer
        } else {
            const randomPassword = `randomPassword${new Date()}`
            const hashPassword = await bcrypt.hash(randomPassword, 10)
            const createdCustomer = await customerService.create({ name, email, phone, password: hashPassword })
            req.user = createdCustomer
        }
        return next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: error.toString()})
    }
   
}

module.exports = checkCustomerInfo