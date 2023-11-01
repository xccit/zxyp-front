import request from '@/utils/request'

const baseUrl = '/admin/product/categoryBrand'

// 根据分类的id获取品牌数据
export const getBrandByCategoryId = categoryId => {
  return request({
    url: `${baseUrl}/listBrand/${categoryId}`,
    method: 'GET',
  })
}

// 分页列表
export const listCategoryBrand = (current, pageSize, queryDto) => {
  return request({
    url: `${baseUrl}/${current}/${pageSize}`,
    method: 'GET',
    params: queryDto,
  })
}

// 新增
export const saveCategoryBrand = categoryBrand => {
  return request({
    url: `${baseUrl}`,
    method: 'POST',
    data: categoryBrand,
  })
}

//删除
export const removeCategoryBrand = ids => {
  return request({
    url: `${baseUrl}/${ids}`,
    method: 'DELETE',
  })
}

//修改
export const updateCategoryBrand = categoryBrand => {
  return request({
    url: `${baseUrl}`,
    method: 'PUT',
    data: categoryBrand,
  })
}
