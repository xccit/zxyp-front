import request from '@/utils/request'

const baseUrl = '/admin/system/role'
// 分页查询角色数据
export const list = (current , pageSize , queryDto) => {
    return request({
        url: `${baseUrl}/list/${current}/${pageSize}`,
        method: 'POST',
        data: queryDto
    })
}
