const jwt = require('jsonwebtoken')

function signToken(user) {
    const token = jwt.sign(
        {id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.EXPRIRE_IN,
        }
    )
    return token;
}

module.exports = {signToken}