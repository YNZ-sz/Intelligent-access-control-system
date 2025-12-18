import { createRouter, createWebHistory } from 'vue-router'
import loginView from '../views/loginView/index.vue'
// 导入新页面组件
import MainLayout from '../layout/MainLayout.vue'
import NotFoundView from '../layout/NotFoundView.vue'
import mineView from '@/views/ynz5View.vue'
import projectView from '@/views/ynz6View.vue'
import UnderDevelopment from '@/views/UnderDevelopment.vue'
import ynz5View from '@/views/ynz5View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main', // 重定向目标保持不变
    },
    {
      path: '/login',
      name: 'login',
      component: loginView,
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: ynz5View,
    },
    {
      path: '/main', // 父路由仍用根路径，但通过 children 匹配二级路由
      name: 'main',
      redirect: '/main/home', // 重定向目标保持不变

      component: MainLayout,
      children: [
        {
          path: 'home', // 完整路径：/home（父路径/ + 子路径home）
          name: 'home',
          component: () => import('@/views/homeView/index.vue'),
        },
        {
          path: 'employee', // 完整路径：/employee
          name: 'employee',
          component: () => import('@/views/employee/index.vue'),
        },
        {
          path: 'employee2', // 完整路径：/employee
          name: 'employee2',
          component: () => import('@/views/employee2/index.vue'),
        },
        {
          path: 'UserInfo', // 完整路径：/employee
          name: 'UserInfo',
          component: () => import('@/layout/UserInfo.vue'),
        },
        {
          path: 'Attendance', // 完整路径：/employee
          name: 'Attendance',
          component: () => import('@/views/AttendancePage/index.vue'),
        },
      ],
    },
    {
      path: '/mine',
      name: 'mine',
      component: mineView,
    },
    {
      path: '/project',
      name: 'project',
      component: projectView,
    },
    {
      path: '/under-development',
      name: 'UnderDevelopment',
      component: UnderDevelopment,
    },
    // 404 路由不变
    // { path: '/404', name: 'NotFound', component: NotFoundView, meta: { requiresAuth: false } },
    // { path: '/:pathMatch(.*)*', redirect: '/404' },
  ],
})

export default router
