// 导入组件

// 导出该组件
import Layout from "@/layout/index.vue";
import category from "@/views/product/category.vue";
import brand from "@/views/product/brand.vue";
import categoryBrand from "@/views/product/categoryBrand.vue";
import productSpec from "@/views/product/productSpec.vue";
import product from "@/views/product/product.vue";

export default ([
    {
        path: "/product",
        component: Layout,
        name: 'product',
        meta: {
            title: 'menu.product',
        },
        icon: 'Promotion',
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
            },
            {
                path: '/categoryBrand',
                name: 'categoryBrand',
                component: categoryBrand,
                meta: {
                    title: 'menu.categoryBrand',
                },
                icon: "PieChart",
                hidden: false
            },
            {
                path: '/productSpec',
                name: 'productSpec',
                component: productSpec,
                meta: {
                    title: 'menu.productSpec',
                },
                icon: "CoffeeCup",
                hidden: false
            },
            {
                path: '/product',
                name: 'product',
                component: product,
                meta: {
                    title: 'menu.product',
                },
                icon: "Shop",
                hidden: false
            },
        ]
    }
])
