const permission = require('../models/PermissionModel')

const create = (inputPermission) => {
    return permission.create(inputPermission)
}

const findAll = () => {
    return permission.find({})
}

const findById = (id) => {
    return permission.findById(id)
}

module.exports = {create, findAll, findById}