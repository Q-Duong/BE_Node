const jwt = require("jsonwebtoken");
const permission = require("../models/PermissionModel");
const config = process.env;

function verifyToken(req,res,next) {
    const token = req.headers["x-access-token"];
    if(!token)
        return res.status(403).json({message: "A token is required"})
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user = decoded
        return next()
    } catch (error) {
        return res.status(401).json({message: "Invalid token"})
    }
}

function verifyByPermission(permissions) {
    return (req,res,next) => {
        const checkPermission = req.user.permissions.some(userPermission => 
            permissions.includes(userPermission)    
        )
        if(!checkPermission)
            return res.status(401).json('You dont have permission')
        next()
    }
}

function verifyByRole(roles){
    return (req,res,next) => {
        console.log(req.user)
        if(!roles.includes(req.user.role.title))
            return res.status(401).json('You dont have permission')
        next()
    }
}

module.exports = {verifyToken, verifyByPermission, verifyByRole}