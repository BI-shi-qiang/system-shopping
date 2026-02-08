import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/manager/home' },
    { 
      path: '/manager', component: () => import ('@/views/Manager.vue'),
      children: [
        { 
          path: 'home', component: () => import('@/views/manager/home.vue'), 
          meta: { name: '系统首页' }
        },
        {
          path: 'admin', component: () => import('@/views/manager/admin.vue'),
          meta: { name: '管理员信息' }
        }
      ]
    },
    {
      path: '/front', component: () => import ('@/views/Front.vue'),
      redirect: '/front/home',
      children: [
        {
          path: '/front/home', component: () => import('@/views/front/home.vue'),
          meta: { name: '首页' }
        },
      ]
    },
    {
      path: '/404', component: () => import('@/views/404.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/404' },// 匹配所有路径，重定向到404页面
  ]
})

export default router
