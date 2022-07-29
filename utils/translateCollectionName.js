function translateCollectionName(name) {
    let result = name
    switch(name) {
        case 'brands':
            result =  'Thương hiệu'
            break;
        case 'categories':
            result =  'Danh mục'
            break;
        case 'suppliers':
            result =  'Nhà cung cấp'
            break;
        case 'products':
            result =  'Hàng hóa'
            break;
        case 'warehouses':
                result =  'Kho hàng'
                break;
        case 'exportorders':
            result =  'Đơn hàng'
            break;
        case 'exportorderdetails':
                result =  'Chi tiết đơn hàng'
                break;
        case 'importorders':
            result =  'Đơn nhập'
            break;
        case 'importorderdetails':
            result =  'Chi tiết đơn nhập'
            break;
        case 'customers':
            result =  'Khách hàng'
            break;
        case 'employees':
            result =  'Nhân viên'
            break;
        case 'payments':
            result =  'Thanh toán'
            break;
        case 'permissions':
            result =  'Quyền truy cập'
            break;
        case 'roles':
            result =  'Chức vụ'
            break;
        
       
        
        default: 
            result =  name
    }
    return result
}

module.exports = translateCollectionName