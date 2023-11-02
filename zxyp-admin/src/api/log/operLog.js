import request from '@/utils/request'

const baseUrl = '/admin/log/oper'

// 登录接口
export const list = (current, pageSize) => {
  return request({
    url: `${baseUrl}/${current}/${pageSize}`,
    method: 'GET',
  })
}
