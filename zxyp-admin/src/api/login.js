/*
 * @Descripttion:
 * @version:
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2021-04-21 09:36:55
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
 */
import request from '@/utils/request'

const baseUrl = '/admin/system/index'

// 登录接口
export const Login = data => {
  return request({
    url: `${baseUrl}/login`,
    method: 'post',
    data,
  })
}

export const GetValidateCode = ()=>{
  return request({
    url: `${baseUrl}/generateValidateCode`,
    method: 'get'
  })
}

// 获取登录用户信息
export const GetUserinfo = () => {
  return request({
    url: `${baseUrl}/userinfo`,
    method: 'get',
  })
}
