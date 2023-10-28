import request from '@/utils/request'

const baseUrl = '/admin/system/menu'
// 树状列表
export const listNodes = () => {
    return request({
        url: `${baseUrl}/nodes`,
        method: 'GET',
    })
}

// 保存信息
export const save = (sysMenu) => {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: sysMenu,
    })
}

// 修改信息
export const update = (sysMenu) => {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: sysMenu,
    })
}

// 根据id删除数据
export const remove = (id) => {
    return request({
        url: `${baseUrl}/${id}`,
        method: 'DELETE',
    })
}
