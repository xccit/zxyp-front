import request from '@/utils/request'

const baseUrl = '/admin/product/productSpec'

// 分页列表
export const listProductSpecPage = (current,pageSize) => {
    return request({
        url: `${baseUrl}/${current}/${pageSize}`,
        method: 'GET'
    })
}

// 新增
export const saveProductSpec = (productSpec) => {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: productSpec
    })
}

//删除
export const removeProductSpec = (ids) => {
    return request({
        url: `${baseUrl}/${ids}`,
        method: 'DELETE'
    })
}

//修改
export const updateProductSpec = (productSpec) => {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: productSpec
    })
}

