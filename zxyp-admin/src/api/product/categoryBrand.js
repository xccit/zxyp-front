import request from '@/utils/request'

const baseUrl = '/admin/product/categoryBrand'

// 分页列表
export const listCategoryBrand = (current,pageSize,queryDto) => {
    return request({
        url: `${baseUrl}/${current}/${pageSize}`,
        method: 'GET',
        params: queryDto
    })
}

// 新增
export const saveBrand = (brand) => {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: brand
    })
}

//删除
export const removeBrand = (ids) => {
    return request({
        url: `${baseUrl}/${ids}`,
        method: 'DELETE'
    })
}

//修改
export const updateBrand = (brand) => {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: brand
    })
}

