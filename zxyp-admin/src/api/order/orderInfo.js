import request from '@/utils/request'

const baseUrl = '/admin/order/orderInfo'

// 订单统计
export const GetOrderStatisticsData = searchObj => {
  return request({
    url: `${baseUrl}/getOrderStatistics`,
    method: 'GET',
    params: searchObj,
  })
}
