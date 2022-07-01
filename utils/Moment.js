const moment = require('moment')

function caculateExpireTime(expireNumber, expireUnit) {
    let expireIn = 0;
    switch (expireUnit) {
        case 'Ngày': 
            expireIn = moment().add(expireNumber,'days');
            break;
        case 'Tháng':
            expireIn = moment().add(expireNumber, 'months');
            break;
        case 'Năm':
            expireIn = moment().add(expireNumber,'years');
            break;
        default: 
            expireIn = moment();
    }
    return expireIn;
}

function checkExpireDate(exp1, exp2) {
    const myExp = moment(exp1)
    if(
        myExp.year() === exp2.year() &&
        myExp.month() === exp2.month() &&
        (myExp.date() - exp2.date() === 0 || myExp.date() - exp2.date() === 1)
    )
        return true
    else
        return false
}

module.exports = {caculateExpireTime, checkExpireDate};