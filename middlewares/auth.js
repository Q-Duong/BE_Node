const jwt = require("jsonwebtoken");
const exportOrderService = require('../services/ExportOrderService');
const config = process.env;

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).json({ message: "A token is required" })
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

function verifyByPermission(permissions) {
    return (req, res, next) => {
        const checkPermission = req.user.permissions.some(userPermission =>
            permissions.includes(userPermission)
        )
        if (!checkPermission)
            return res.status(401).json('You dont have permission')
        next()
    }
}

function verifyByRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role.title))
            return res.status(401).json('You dont have permission')
        next()
    }
}

async function verifyOwnerOrder(req, res, next) {
    try {
        const customer = req.user
        const { order } = req.body
        const foundOrder = await exportOrderService.findById(order)
        if (!foundOrder)
            return res.status(400).json({ message: 'order has not found' })

        if (foundOrder.customer.toString() !== customer.id)
            return res.status(401).json({ message: 'you dont have permission to create comment of this order' })
        return next()
    } catch (error) {
        return res.status(500).json({ message: error.toString() })
    }

}

module.exports = { verifyToken, verifyByPermission, verifyByRole, verifyOwnerOrder }
