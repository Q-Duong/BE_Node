const moment = require('moment')

function checkExpireDate(exp1, exp2) {
    const myExp = moment(exp1)
    const myExp2 = moment(exp2)
    if(
        myExp.year() === myExp2.year() &&
        myExp.month() === myExp2.month() &&
        (myExp.date() - myExp2.date() === 0 || myExp.date() - myExp2.date() === 1)
    )
        return true
    else
        return false
}

module.exports = {checkExpireDate};