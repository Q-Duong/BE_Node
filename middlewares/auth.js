const jwt = require("jsonwebtoken")
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

module.exports = {verifyToken}