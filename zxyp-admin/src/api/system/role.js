import request from '@/utils/request'

const baseUrl = '/admin/system/role'
// 分页查询角色数据
export const list = (current, pageSize, queryDto) => {
  return request({
    url: `${baseUrl}/${current}/${pageSize}`,
    method: 'GET',
    params: queryDto,
  })
}

//添加角色
export const save = sysRole => {
  return request({
    url: `${baseUrl}`,
    method: 'POST',
    data: sysRole,
  })
}

//删除角色
export const remove = roleIds => {
  return request({
    url: `${baseUrl}`,
    method: 'DELETE',
    data: roleIds,
  })
}

//更新角色
export const update = sysRole => {
  return request({
    url: `${baseUrl}`,
    method: 'PUT',
    data: sysRole,
  })
}

//根据用户ID查询拥有的角色列表
export const listAll = userId => {
  return request({
    url: `${baseUrl}/${userId}`,
    method: 'GET',
  })
}

// 根据角色分配菜单请求方法
export const assign = assignMenuDto => {
  return request({
    url: `${baseUrl}/assign`,
    method: 'POST',
    data: assignMenuDto,
  })
}
