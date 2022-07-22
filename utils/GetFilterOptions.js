const moment = require('moment')

function getFilterOptions(req) {
    const { name, active, fromDate, toDate } = req.query
    const aggregateMatch = {}
    if (name) {
        const names = Array.isArray(name) ? name : [name]
        aggregateMatch['product.name'] = {
                $in: names
            }
    }
    if (active) {
        aggregateMatch.active = Boolean(active)
    }
    if (fromDate) {
        aggregateMatch.manufacturingDate = {
            $gte: moment(fromDate).toDate()
        }
    }
    if (toDate) {
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
    return myAggregate
}
module.exports = getFilterOptions