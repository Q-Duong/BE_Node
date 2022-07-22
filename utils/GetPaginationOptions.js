function getPaginationOptions(req) {
    const {reqPage, reqLimit} = req.query
    const page = reqPage && page >= 0 ? Number(reqPage) : 1
    const limit = reqLimit && limit >= 10 ? Number(reqLimit) : 10
    return { page, limit }
}

module.exports = getPaginationOptions