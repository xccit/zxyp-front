// 导入组件

// 导出该组件
import Layout from "@/layout/index.vue";
import category from "@/views/product/category.vue";
import brand from "@/views/product/brand.vue";

export default ([
    {
        path: "/product",
        component: Layout,
        name: 'product',
        meta: {
            title: 'menu.product',
        },
        icon: 'Location',
        children: [
            {
                path: '/category',
                name: 'category',
                component: category,
                meta: {
                    title: 'menu.category',
                },
                icon: "MoreFilled",
                hidden: false
            },
            {
                path: '/brand',
                name: 'brand',
                component: brand,
                meta: {
                    title: 'menu.brand',
                },
                icon: "Histogram",
                hidden: false
            }
        ]
    }
])
