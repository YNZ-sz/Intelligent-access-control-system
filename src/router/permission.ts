import router from './index' // 导入路由实例
import { useUserStore } from '@/stores/user' // 导入 Pinia 用户仓库
import { ElMessage } from 'element-plus' // 可选：用 UI 库提示（可替换为 alert）

const devRoutes = [
  '/main/department',
  '/main/system/profile',
  '/main/system/security',
  '/mainsystem/notice',
]
// // 全局前置守卫：路由跳转前触发（每次跳转都执行）
router.beforeEach((to, from, next) => {
  if (devRoutes.includes(to.path)) {
    // 跳转到开发中页面
    next('/under-development')
  }

  const userStore = useUserStore() // 实例化 Pinia 仓库

  // 1. 初始化 Token：页面刷新时，从本地存储恢复 Token（避免刷新后登录状态丢失）
  if (!userStore.token && localStorage.getItem('token')) {
    userStore.initToken()
  }

  // // 2. 判断目标路由是否需要登录（根据 meta.requiresAuth）
  // const needLogin = to.meta.requiresAuth;

  // if (needLogin) {
  //   // 3. 需要登录：检查是否已登录（Token 存在）
  if (userStore.isLogin) {
    // 已登录：直接放行
    next()
  } else {
    if (to.path === '/login') {
      next() // 进入登录页，不做拦截
      return // 终止后续逻辑
    }
    // 未登录：强制跳登录页，并携带「来源页路径」（登录后回跳）
    ElMessage.warning('请先登录') // 友好提示（可选）

    next({
      path: '/login',
    })
  }
  // } else {
  //   // 4. 不需要登录：直接放行（如登录页、404页）
  //   next();
  // }
  // console.log('路由鉴权触发前置')
  next()
})

// 全局后置守卫：路由跳转后触发（可选，用于统计、埋点等）
router.afterEach((to) => {
  // 示例：设置页面标题
  // document.title = `${to.name || '首页'} - 你的项目名称`;
  // console.log('路由鉴权触发后置')
})

// 导出鉴权后的路由（仅需在 main.ts 导入一次即可）
export default router
