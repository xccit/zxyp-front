import request from '@/utils/request'

const baseUrl = '/admin/product/category'

// 根据parentId获取下级节点
export const listCategoryByParentID = parentId => {
    return request({
        url: `${baseUrl}/${parentId}`,
        method: 'GET'
    })
}

// 导出方法
export const exportData = () => {
    return request({
        url: `${baseUrl}/export`,
        method: 'GET',
        responseType: 'blob'
    })
}

//导入方法
export const importData = () => {
    return request({
        url: `${baseUrl}/import`,
        method: 'POST'
    })
}

//删除分类
export const removeCategory = (id) => {
    return request({
        url: `${baseUrl}/${id}`,
        method: 'DELETE'
    })
}

//修改分类
export const updateCategory = (categoryDto) => {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: categoryDto
    })
}

