// 导入组件
const swagger = () => import('@/views/system/Swagger.vue')
const Layout = () => import('@/layout/index.vue')
const sysRole = () => import('@/views/system/SysRole.vue')
const sysUser = () => import('@/views/system/SysUser.vue')
const sysMenu = () => import('@/views/system/SysMenu.vue')

// 导出该组件
export default([
    {
        path: "/system",
        component: Layout,
        name: 'system',
        meta: {
            title: 'menu.system',
        },
        icon: 'Location',
        children: [
            {
                path: '/sysRole',
                name: 'sysRole',
                component: sysRole,
                meta: {
                    title: 'menu.sysRole',
                },
                icon:"Service",
                hidden: false
            },
            {
                path: '/sysUser',
                name: 'sysUser',
                component: sysUser,
                meta: {
                    title: 'menu.sysUser',
                },
                icon:'User',
                hidden: false
            },
            {
                path: '/menu',
                name: 'sysMenu',
                component: sysMenu,
                meta: {
                    title: 'menu.sysMenu',
                },
                icon:'Menu',
                hidden: false
            },
            {
                path: 'swagger',
                name: 'Swagger',
                component: swagger,
                meta: {
                    title: 'menu.swagger',
                },
                icon:'Document',
                hidden: false
            }
        ]
    }
])
