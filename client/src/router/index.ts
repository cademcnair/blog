import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[]=[
    {
        path: '/',
        component: () => import('../views/index.vue'),
    },{
        path: '/:c/catergory/',
        component: () => import('../views/catergory.vue'),
    },{
        path: '/:p/post/',
        component: () => import('../views/post.vue'),
    },{
        path: '/post/create/',
        component: () => import('../views/post/create.vue'),
    },{
        path: '/:p/post/edit/',
        component: () => import('../views/post/edit.vue'),
    },{
        path: '/:c/catergory/edit/',
        component: () => import('../views/catergory/edit.vue'),
    },{
        path: '/catergory/create/',
        component: () => import('../views/catergory/create.vue'),
    },{
        path: '/login/',
        component: () => import('../views/accounts/login.vue'),
    },{
        path: '/register/',
        component: () => import('../views/accounts/register.vue'),
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})