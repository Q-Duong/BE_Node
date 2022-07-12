const role = require('../models/RoleModel')

const create = (inputRole) => {
    return role.create(inputRole)
}

const findAll = () => {
    return role.find({})
}

const findById = (id) => {
    return role.findById(id)
}

module.exports = {create, findAll, findById}