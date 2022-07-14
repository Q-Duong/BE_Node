function translateCollectionName(name) {
    let result = name
    switch(name) {
        case 'brands':
            result =  'thương hiệu'
            break;
        case 'categories':
            result =  'danh mục'
            break;
        case 'customers':
            result =  'khách hàng'
            break;
        case 'employees':
            result =  'nhân viện'
            break;
        case 'exportorderdetails':
            result =  'chi tiết đơn hàng'
            break;
        case 'exportorders':
            result =  'đơn hàng'
            break;
        case 'importorderdetails':
            result =  'chi tiết đơn nhập'
            break;
        case 'importorders':
            result =  'đơn nhập'
            break;
        case 'payments':
            result =  'thanh toán'
            break;
        case 'permissions':
            result =  'quyền truy cập'
            break;
        case 'roles':
            result =  'chức vụ'
            break;
        case 'suppliers':
            result =  'nhà cung cấp'
            break;
        case 'warehouses':
            result =  'kho hàng'
            break;
        case 'products':
            result =  'hàng hóa'
            break;
        default: 
            result =  name
    }
    return result
}

module.exports = translateCollectionName