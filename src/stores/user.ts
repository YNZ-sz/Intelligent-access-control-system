// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

// src/stores/user.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { login as loginApi, getSalt, tktext } from '@/api/user' // 导入接口
import type { ApiResponse } from '@/utils/request'
import { menuList } from '@/config/menu'
import type { MenuItem } from '@/config/menu'
import { employee_get_text } from '@/api/employee' // 导入接口

// 定义用户信息类型（TS 类型约束）
export interface UserInfo {
  id: number
  username: string
  role: string
  // 其他字段按后端返回补充
}

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const token = ref<string>('')
  const refreshToken = ref<string>('')
  const userInfo = ref<any | null>(null)
  const piniausername = ref<string | null>('')
  let usermenuList = ref<MenuItem[]>([])

  const userRole = computed(() => userInfo.value?.role ?? 'admin')

  const isLogin = computed(() => !!token.value)
  const userInfo_carf = ref<boolean>(false)
  // const userRole = ref<string>('employee')
  // const usermenuList = menuList

  // 动作：登录（调用接口 + 存储状态）
  const login = async (loginUsername: string, password: string) => {
    let res: any = null

    try {
      res = await loginApi(loginUsername, password)
      if (res.code !== 200) {
        throw new Error(res.msg)
      }
    } catch (err) {
      console.error(err)
      alert('登录失败具体细节已打印')
      return Promise.reject(err)
    }

    token.value = res.data.accessToken
    refreshToken.value = res.data.refreshToken
    userInfo.value = res.data // 假设后端返回 { token, user: { id, username... } }
    localStorage.setItem('token', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    localStorage.setItem('name', res.data.username)
    localStorage.setItem('userInfo', JSON.stringify(res.data)) // 同步 userInfo 到 localStorage

    console.log(res.data)

    initMenus()
    console.log('成功, pinia提示')

    router.push({ name: 'main' })
    return null
  }
  const logout = () => {
    removeToken()
    clearState()
    router.push('/login')
  }
  // // 动作：退出登录（调用接口 + 清除状态 + 跳转）
  // const logout = async () => {
  //   try {
  //     await logoutApi() // 调用后端退出接口（可选）
  //   } finally {
  //     // 强制清除状态
  //     token.value = ''
  //     userInfo.value = null
  //     router.push('/login') // 跳回登录页
  //   }
  // }

  // 动作：清除状态（如 Token 失效时）

  const restoreState = () => {
    const savedToken = localStorage.getItem('token')
    const savedRefreshToken = localStorage.getItem('refreshToken')
    const savedUserInfo = localStorage.getItem('userInfo')
    const username = localStorage.getItem('name')

    if (savedToken) token.value = savedToken
    if (savedRefreshToken) refreshToken.value = savedRefreshToken
    if (savedUserInfo) userInfo.value = JSON.parse(savedUserInfo) // 注意：localStorage 存的是字符串，需解析
    if (username) piniausername.value = username
  }

  const filterMenus = (menus: MenuItem[]): MenuItem[] => {
    return menus
      .filter((menu) => {
        const currentRoles = menu.roles
        if (currentRoles === undefined) {
          return true // 父都没写 roles → 显示
        }
        return currentRoles.some((role) => role === userRole.value)
      })
      .map((menu) => {
        if (menu.children) {
          // 递归过滤子菜单时，把当前菜单的 roles 传给子菜单（作为父 roles）
          menu.children = filterMenus(menu.children)
        }
        return menu
      })
  }
  const initMenus = () => {
    // 模拟从 userInfo 中获取角色（实际需从真实的用户信息中取）
    usermenuList.value = filterMenus(menuList)
  }
  const initToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (storedToken && storedRefreshToken) {
      token.value = storedToken
      refreshToken.value = storedRefreshToken
    }
  }
  const removeToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('name')
  }
  const clearState = () => {
    token.value = ''
    refreshToken.value = ''
    userInfo.value = null
    piniausername.value = ''
  }
  //mock
  const tokentext = async () => {
    let res: any = null
    console.log('触发员工测试')
    try {
      res = await employee_get_text()
      if (res.code !== 200) {
        throw new Error(res.message)
      }
    } catch (err) {
      console.error('员工测试失败', err)
      alert('员工测试失败')
      return Promise.reject(err)
    }
    console.log('员工测试成功')
  }

  return {
    token,
    userInfo,
    isLogin,
    usermenuList,
    piniausername,
    userInfo_carf,
    login,
    logout,
    initMenus,
    restoreState,
    initToken,
    tokentext,
  }
})
