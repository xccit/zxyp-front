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
            title: '系统管理',
        },
        icon: 'Location',
        children: [
            {
                path: '/sysRole',
                name: 'sysRole',
                component: sysRole,
                meta: {
                    title: '角色管理',
                },
                icon:"Service",
                hidden: false
            },
            {
                path: '/sysUser',
                name: 'sysUser',
                component: sysUser,
                meta: {
                    title: '用户管理',
                },
                icon:'User',
                hidden: false
            },
            {
                path: '/menu',
                name: 'sysMenu',
                component: sysMenu,
                meta: {
                    title: '菜单管理',
                },
                icon:'Menu',
                hidden: false
            },
            {
                path: 'swagger',
                name: 'Swagger',
                component: swagger,
                meta: {
                    title: '接口测试',
                },
                icon:'Document',
                hidden: false
            }
        ]
    }
])
