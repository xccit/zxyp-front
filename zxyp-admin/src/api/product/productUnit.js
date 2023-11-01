import request from '@/utils/request'

const baseUrl = '/admin/product/productUnit'

// 获取全部信息
export const listAllUnit = () => {
    return request({
        url: `${baseUrl}`,
        method: 'GET',
    })
}
