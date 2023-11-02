import Layout from '@/layout/index.vue'
const operLog = () => import('@/views/log/operLog.vue')

export default [
  {
    path: '/log',
    component: Layout,
    name: 'log',
    meta: {
      title: 'menu.log',
    },
    icon: 'More',
    children: [
      {
        path: '/operLog',
        name: 'operLog',
        component: operLog,
        meta: {
          title: 'menu.operLog',
        },
        icon: 'InfoFilled',
        hidden: false,
      },
    ],
  },
]
