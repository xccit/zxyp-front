import request from '@/utils/request'

const baseUrl = '/admin/system/user'
// 分页查询用户数据
export const list = (current, pageSize, queryDto) => {
    return request({
        url: `${baseUrl}/${current}/${pageSize}`,
        method: 'GET',
        params: queryDto
    })
}

export const save = (sysUser) => {
    return request({
        url: `${baseUrl}`,
        method: 'POST',
        data: sysUser
    })
}

export const remove = (userIds) => {
    return request({
        url: `${baseUrl}/${userIds}`,
        method: 'DELETE',
    })
}

export const update = (sysUser) => {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: sysUser
    })
}


export const assignRole = (assignRoleDto) => {
    return request({
        url: `${baseUrl}/assign`,
        method: 'POST',
        data: assignRoleDto
    })
}
