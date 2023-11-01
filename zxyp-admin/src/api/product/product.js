import request from '@/utils/request'

const baseUrl = '/admin/product'

// 分页列表
export const listProductPage = (page, limit, queryDto) => {
  return request({
    url: `${baseUrl}/${page}/${limit}`,
    method: 'GET',
    params: queryDto,
  })
}

// 保存信息
export const saveProduct = product => {
  return request({
    url: `${baseUrl}`,
    method: 'POST',
    data: product,
  })
}

// 修改信息
export const updateProduct = product => {
  return request({
    url: `${baseUrl}`,
    method: 'PUT',
    data: product,
  })
}

// 根据id获取信息
export const getOne = id => {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'GET',
  })
}

// 根据id删除商品
export const removeProduct = id => {
  return request({
    url: `${baseUrl}/${id}`,
    method: 'DELETE',
  })
}

//审核
export const updateProductAudit = (id, auditStatus) => {
  return request({
    url: `${baseUrl}/audit/${id}/${auditStatus}`,
    method: 'GET',
  })
}

//上下架
export const updateProductStatus = (id, status) => {
  return request({
    url: `${baseUrl}/status/${id}/${status}`,
    method: 'GET',
  })
}
