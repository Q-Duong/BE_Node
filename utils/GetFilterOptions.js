const moment = require('moment')

function getFilterOptions(req) {
    const { name, active, fromDate, toDate } = req.query
    const aggregateMatch = {}    
    if (name != "undefined" && name != '') {
        const queryName = name.trim()
        const queryNameArr = queryName.split(' ').map(word => ({
            'product.name': { $regex: `.*${word}.*`, $options: 'si' }
        }))
        queryNameArr.push({ 'product.name': { $regex: `.*${queryName}.*`, $options: 'si' } })
        aggregateMatch['$or'] = queryNameArr
        
    }
    if (active != "undefined" && active != '') {
        aggregateMatch.active = active === 'true'
    }
    if (fromDate != "undefined" && fromDate != '') {
        aggregateMatch.manufacturingDate = {
            $gte: moment(fromDate).toDate()
        }
    }
    if (toDate != "undefined" && name != '') {
        aggregateMatch.expireIn = {
            $lte: moment(toDate).toDate()
        }
    }

    const myAggregate = [
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: { path: '$product' }
        },
        {
            $match: aggregateMatch
        }
    ]
    console.log(myAggregate)
    return myAggregate
}
module.exports = getFilterOptions