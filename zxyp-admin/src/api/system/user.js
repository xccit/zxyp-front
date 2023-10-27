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

export const save = (sysRole) => {
    return request({
        url: `${baseUrl}/save`,
        method: 'POST',
        data: sysRole
    })
}

export const remove = (roleIds) => {
    return request({
        url: `${baseUrl}`,
        method: 'DELETE',
        data: roleIds
    })
}

export const update = (sysRole) => {
    return request({
        url: `${baseUrl}`,
        method: 'PUT',
        data: sysRole
    })
}
