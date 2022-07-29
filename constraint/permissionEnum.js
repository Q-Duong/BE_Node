const COLLECTION_NAME = [
    'brands',
    'categories',
    'customers',
    'employees',
    'exportorderdetails',
    'exportorders',
    'importorderdetails',
    'importorders',
    'payments',
    'permissions',
    'roles',
    'suppliers',
    'warehouses',
    'products'
]

PERMISSION_TITLE_ENUM = [`read_dashboard`]
COLLECTION_NAME.forEach(name => {
    PERMISSION_TITLE_ENUM.push(`read_${name}`)
    PERMISSION_TITLE_ENUM.push(`create_${name}`)
    PERMISSION_TITLE_ENUM.push(`update_${name}`)
    PERMISSION_TITLE_ENUM.push(`delete_${name}`)

})

module.exports = {
    PERMISSION_TITLE_ENUM
}