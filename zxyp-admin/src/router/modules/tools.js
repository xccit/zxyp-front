import Layout from "@/layout/index.vue";
import minio from "@/views/tools/Minio.vue";
import swagger from "@/views/tools/Swagger.vue";
import druid from "@/views/tools/druid.vue";

export default ([
    {
        path: "/tools",
        component: Layout,
        name: 'tools',
        meta: {
            title: 'menu.tools',
        },
        icon: 'Tools',
        children: [
            {
                path: '/swagger',
                name: 'swagger',
                component: swagger,
                meta: {
                    title: 'menu.swagger',
                },
                icon: 'Document',
                hidden: false
            },
            {
                path: '/minIO',
                name: 'minIO',
                component: minio,
                meta: {
                    title: 'menu.minio',
                },
                icon: 'Document',
                hidden: false
            },
            {
                path: '/druid',
                name: 'druid',
                component: druid,
                meta: {
                    title: 'menu.druid',
                },
                icon: 'Cpu',
                hidden: false
            },
        ]
    }
])
