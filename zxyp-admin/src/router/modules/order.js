const Layout = () => import('@/layout/index.vue')
const orderStatistics = () => import('@/views/order/orderStatistics.vue')
const orderInfo = () => import('@/views/order/orderInfo.vue')

export default [
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: {
      title: 'menu.orderInfo',
    },
    icon: 'Operation',
    children: [
      {
        path: '/orderStatistics',
        name: 'orderStatistics',
        component: orderStatistics,
        meta: {
          title: 'menu.orderStatistics',
        },
        icon: 'DataLine',
      },
      {
        path: '/orderInfo',
        name: 'orderInfo',
        component: orderInfo,
        meta: {
          title: 'menu.orderInfo',
        },
        icon: 'Operation',
      },
    ],
  },
]
