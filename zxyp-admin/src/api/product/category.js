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
