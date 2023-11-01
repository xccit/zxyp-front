import Layout from "@/layout/index.vue";
import orderInfo from "@/views/order/orderInfo.vue";
import orderStatistics from "@/views/order/orderStatistics.vue";

// 导出该组件
export default ([
    {
        path: "/order",
        component: Layout,
        name: 'order',
        meta: {
            title: 'menu.order',
        },
        icon: 'TrendCharts',
        children: [
            {
                path: '/orderInfo',
                name: 'orderInfo',
                component: orderInfo,
                meta: {
                    title: 'menu.orderInfo',
                },
                icon: "MoreFilled",
                hidden: false
            },
            {
                path: '/orderStatistics',
                name: 'orderStatistics',
                component: orderStatistics,
                meta: {
                    title: 'menu.orderStatistics',
                },
                icon: "DataLine",
                hidden: false
            }
        ]
    }
])
