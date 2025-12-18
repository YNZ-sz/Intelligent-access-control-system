<!-- src/views/layout/MainLayout.vue（主页布局组件） -->
<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- 左侧边栏（可折叠） -->
    <el-aside
      width="300"
      class="bg-gradient-to-br from-blue-100 via-indigo-100 via-purple-100 to-pink-100 shadow-lg transition-all duration-300 z-10"
    >
      <!-- 侧边栏头部（Logo + 折叠按钮） -->
      <div class="flex items-center justify-between h-16 px-4 border-b border-gray-300">
        <div class="flex items-center space-x-2" v-if="!isSidebarCollapse">
          <el-icon class="text-indigo-600 text-xl">
            <OfficeBuilding />
          </el-icon>
          <span class="font-bold text-gray-800 text-lg">智能考勤系统</span>
        </div>
        <el-icon
          class="text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors"
          @click="isSidebarCollapse = !isSidebarCollapse"
        >
          <ArrowLeft v-if="!isSidebarCollapse" />
          <ArrowRight v-else />
        </el-icon>
      </div>

      <!-- 侧边栏菜单 -->
      <el-menu
        :default-active="activeMenu"
        class="h-[calc(100vh-5rem)] border-r-0 custom-menu font-bold"
        background-color="transparent"
        text-color="#333333"
        active-text-color="#333333"
        :collapse="isSidebarCollapse"
        @select="handleMenuSelect"
        style="--el-menu-active-color: transparent"
      >
        <template v-for="menu in userStore.usermenuList" :key="menu.index">
          <!-- 有子菜单的情况 -->
          <el-sub-menu
            v-if="menu.children && menu.children.length"
            :index="menu.index"
            class="relative"
          >
            <template #title>
              <!-- 自定义状态容器：绑定当前菜单是否激活/悬浮 -->
              <div
                class="menu-item-container"
                :class="[
                  activeMenu === menu.index ? 'active' : '',
                  isHoveringIndex === menu.index ? 'hover' : '',
                ]"
                @mouseenter="isHoveringIndex = menu.index"
                @mouseleave="isHoveringIndex = ''"
              >
                <el-icon><component :is="menu.icon" /></el-icon>
                <span v-if="!isSidebarCollapse">{{ menu.title }}</span>
              </div>
            </template>
            <el-menu-item
              v-for="subMenu in menu.children"
              :key="subMenu.index"
              :index="subMenu.index"
              class="relative"
            >
              <div
                class="menu-item-container"
                :class="[
                  activeMenu === subMenu.index ? 'active' : '',
                  isHoveringIndex === subMenu.index ? 'hover' : '',
                ]"
                @mouseenter="isHoveringIndex = subMenu.index"
                @mouseleave="isHoveringIndex = ''"
              >
                <span>{{ subMenu.title }}</span>
              </div>
            </el-menu-item>
          </el-sub-menu>

          <!-- 无子菜单的情况 -->
          <el-menu-item v-else :index="menu.index" class="relative">
            <div
              class="menu-item-container"
              :class="[
                activeMenu === menu.index ? 'active' : '',
                isHoveringIndex === menu.index ? 'hover' : '',
              ]"
              @mouseenter="isHoveringIndex = menu.index"
              @mouseleave="isHoveringIndex = ''"
            >
              <el-icon><component :is="menu.icon" /></el-icon>
              <span v-if="!isSidebarCollapse">{{ menu.title }}</span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <!-- 右侧主内容区（顶部 + 主界面） -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部导航栏 -->
      <el-header
        class="bg-gradient-to-br from-sky-100 via-indigo-100 via-purple-100 to-rose-100 shadow-sm h-16 px-6 flex items-center border-b border-gray-300 justify-between"
      >
        <!-- 移动端侧边栏展开按钮 -->
        <el-icon
          class="md:hidden mr-2 text-gray-500 cursor-pointer"
          @click="isSidebarCollapse = !isSidebarCollapse"
        >
          <Menu />
        </el-icon>
        <el-button
          type="primary"
          class="px-2 py-4 mr-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0"
          @click="router.push({ path: '/aboutMe' })"
        >
          作者信息
        </el-button>
        <!-- 公告栏 -->
        <div class="flex items-center p-2 rounded-2xl shadow-lg border bg-white flex-1 mr-5">
          <el-icon><Message /></el-icon>
          <p class="text-gray-800 text-xs ml-1">公告: 本站仍在开发阶段，部分功能尚未完善...</p>
        </div>

        <!-- 右侧用户信息 + 退出登录 -->
        <div class="ml-auto flex items-center space-x-4">
          <el-popover
            trigger="click"
            placement="bottom-end"
            :width="300"
            popper-class="custom-popover"
          >
            <template #reference>
              <div class="flex items-center space-x-2 cursor-pointer">
                <span class="text-highlight hidden sm:inline-block">{{
                  userStore.piniausername
                }}</span>
                <el-avatar :size="32" class="bg-indigo-100 text-indigo-600">
                  <UserFilled />
                </el-avatar>
              </div>
            </template>
            <template #default>
              <div class="space-y-4">
                <div
                  class="rounded-md p-2 hover:bg-gray-100 transition-colors cursor-pointer"
                  @click="router.push('/main/UserInfo')"
                >
                  <div class="flex items-center">
                    <div
                      class="mr-2 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white border-2 border-purple-300"
                    >
                      <User class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="text-heading">啊洲</p>
                      <p class="text-heading">进入个人中心 ></p>
                    </div>
                  </div>
                </div>
                <!-- 算力区域 -->
                <div class="border-t p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <p class="mb-1 font-bold">算力</p>
                  <div class="flex items-center">
                    <el-icon class="mr-2 text-gray-700"><Zap /></el-icon>
                    <span class="font-bold">10000(购) + 100(赠)</span>
                    <el-button
                      type="primary"
                      size="mini"
                      class="ml-auto bg-orange-500 hover:bg-orange-600 border-none"
                      >充值</el-button
                    >
                    <el-button type="text" class="text-orange-500 ml-2">明细</el-button>
                    <el-icon class="ml-2 text-gray-500"><ArrowRight /></el-icon>
                  </div>
                </div>

                <!-- 关注区域 -->
                <div
                  @click="
                    () => {
                      userStore.userInfo_carf = true
                      router.push('/main/UserInfo')
                    }
                  "
                  class="border-y border-gray-100 rounded-md p-3 flex items-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <el-icon class="mr-2 text-gray-700"><Edit /></el-icon>
                  <span class="font-bold">我的信息</span>
                </div>

                <div
                  class="flex items-center p-1 rounded-md hover:bg-pink-100 hover:text-pink-600 transition-colorsr"
                  @click="handleLogout"
                >
                  <el-icon class="mx-2"><ArrowRight /></el-icon>
                  <span class="font-bold">登出</span>
                </div>
              </div>
            </template>
          </el-popover>
        </div>
      </el-header>

      <el-main
        class="bg-gradient-to-br from-sky-100 via-indigo-100 via-purple-100 to-rose-100 flex-1 overflow-y-auto p-6 bg-gray-50"
        style="max-height: calc(100vh - 4rem)"
      >
        <div
          v-if="!isSidebarCollapse"
          class="bg-white/70 backdrop-blur-sm rounded-xl py-3 mb-3 md:hidden"
        >
          <el-menu
            :default-active="activeMenu"
            class="border-r-0 custom-menu font-bold"
            background-color="transparent"
            text-color="#333333"
            active-text-color="#333333"
            @select="handleMenuSelect"
            style="--el-menu-active-color: transparent"
          >
            <template v-for="menu in userStore.usermenuList" :key="menu.index">
              <!-- 有子菜单的情况 -->
              <el-sub-menu
                v-if="menu.children && menu.children.length"
                :index="menu.index"
                class="relative"
              >
                <template #title>
                  <!-- 自定义状态容器：绑定当前菜单是否激活/悬浮 -->
                  <div
                    class="menu-item-container"
                    :class="[
                      activeMenu === menu.index ? 'active' : '',
                      isHoveringIndex === menu.index ? 'hover' : '',
                    ]"
                    @mouseenter="isHoveringIndex = menu.index"
                    @mouseleave="isHoveringIndex = ''"
                  >
                    <el-icon><component :is="menu.icon" /></el-icon>
                    <span>{{ menu.title }}</span>
                  </div>
                </template>
                <el-menu-item
                  v-for="subMenu in menu.children"
                  :key="subMenu.index"
                  :index="subMenu.index"
                  class="relative"
                >
                  <div
                    class="menu-item-container"
                    :class="[
                      activeMenu === subMenu.index ? 'active' : '',
                      isHoveringIndex === subMenu.index ? 'hover' : '',
                    ]"
                    @mouseenter="isHoveringIndex = subMenu.index"
                    @mouseleave="isHoveringIndex = ''"
                  >
                    <span>{{ subMenu.title }}</span>
                  </div>
                </el-menu-item>
              </el-sub-menu>

              <!-- 无子菜单的情况 -->
              <el-menu-item v-else :index="menu.index" class="relative">
                <div
                  class="menu-item-container"
                  :class="[
                    activeMenu === menu.index ? 'active' : '',
                    isHoveringIndex === menu.index ? 'hover' : '',
                  ]"
                  @mouseenter="isHoveringIndex = menu.index"
                  @mouseleave="isHoveringIndex = ''"
                >
                  <el-icon><component :is="menu.icon" /></el-icon>
                  <span>{{ menu.title }}</span>
                </div>
              </el-menu-item>
            </template>
          </el-menu>
        </div>

        <!-- 子路由组件（员工管理页面）会在这里渲染，溢出时滚动 -->
        <router-view />
      </el-main>

      <!-- 主内容区（滚动） -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useEmployeeStore } from '@/stores/employee'

import type { MenuItem } from '@/config/menu'
import type { Edit } from '@element-plus/icons-vue'

// // 导入 Element Plus 组件和图标
// import {
//   ElAside,
//   ElHeader,
//   ElMain,
//   ElMenu,
//   ElSubMenu,
//   ElMenuItem,
//   ElCard,
//   ElDropdown,
//   ElDropdownMenu,
//   ElDropdownItem,
//   ElDropdownDivider,
//   ElAvatar,
//   ElIcon,
//   ElSelect,
//   ElOption,
// } from 'element-plus'
// import {
//   HomeFilled,
//   UserFilled,
//   Setting,
//   Menu,
// Calendar,
//   CalendarFilled,
//  UserGroup,
//   ChevronLeft,
//   ChevronRight,
//   BarChart,
//   ChevronDown,
//   Logout,
//   CheckCircleFilled,
//   CloseCircleFilled,
//   PieChart,
//   Document,
//   ArrowUp,
//   ArrowDown,
//   Clock,
//   Check,
//   Edit,
//   Download,

//   OfficeBuilding,
// } from '@element-plus/icons-vue'

// 状态管理
const userStore = useUserStore()
const EmployeeStore = useEmployeeStore()
const router = useRouter()

// 响应式变量
const username = ref<string | null>('testAdmin') // 从 Pinia 获取用户名
const isSidebarCollapse = ref<boolean>(false) // 侧边栏折叠状态
const activeMenu = ref<string>('/home') // 当前激活菜单
const todayDate = computed(() => {
  // 格式化今日日期：YYYY-MM-DD 星期X
  const date = new Date()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${weekDays[date.getDay()]}`
})
const chartType = ref<string>('checkIn') // 图表类型

const isHoverPersonal = ref<boolean>(false)
const isHoveringIndex = ref('') // 当前悬浮的菜单index

onMounted(() => {
  // 页面刷新时，若存在 token 和用户角色，则重新初始化菜单
  userStore.restoreState()
  if (userStore.token && userStore.userInfo.role) {
    userStore.initMenus()
  }
})
// 菜单选中事件
const handleMenuSelect = (index: string) => {
  activeMenu.value = index
  // 实际项目中可通过路由跳转对应页面
  router.push(index)
}

// 退出登录
const handleLogout = () => {
  userStore.logout() // 调用 Pinia 的退出登录方法（清空用户信息）
  // router.push('/login') // 跳回登录页
}
</script>

<style scoped>
/* 侧边栏菜单样式优化 */
/* :deep(.el-menu) {
  --el-menu-active-color: #4f46e5;
  --el-menu-hover-text-color: #4f46e5;
}

:deep(.el-sub-menu__title:hover),
:deep(.el-menu-item:hover) {
  background-color: #f5f3ff !important;
} */

/* 卡片hover效果 */
:deep(.el-card) {
  transition: all 0.3s ease;
}

/* 响应式适配 */
@media (max-width: 768px) {
  :deep(.el-aside) {
    position: fixed !important;
    height: 100vh !important;
    left: 0;
    top: 0;
    z-index: 100;
    transform: translateX(-100%);
    &.el-aside-open {
      transform: translateX(0);
    }
  }

  .el-header {
    padding: 0 16px !important;
  }
}

/* 主内容区滚动优化 */
.el-main {
  padding: 20px 16px !important;
}

/* 图表容器样式 */
.chart-container {
  width: 100%;
  height: 280px;
}
/* 自定义 Popover 样式 */
:deep(.custom-popover) {
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
<style scoped>
/* 重置Element Plus原生菜单样式 */
:deep(.custom-menu) {
  --el-menu-item-height: 44px; /* 统一菜单项高度 */
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: var(--el-menu-item-height);
  line-height: var(--el-menu-item-height);
  padding: 0 16px !important; /* 重置内边距 */
  margin: 4px 0; /* 菜单项间距 */
}
:deep(.el-menu-item.is-active),
:deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  background-color: transparent !important; /* 完全覆盖原生激活背景 */
}
:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: transparent !important; /* 清除原生hover背景 */
}
/* 自定义菜单项容器：控制三种状态 */
.menu-item-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border-radius: 22px; /* 胶囊状圆角（高度的一半） */
  transition: all 0.2s ease;
  color: #666; /* 未激活文字色 */
}

/* 未激活状态（默认） */
.menu-item-container:not(.active):not(.hover) {
  background-color: transparent;
}

/* 悬浮状态 */
.menu-item-container.hover:not(.active) {
  background-color: #e6f7ff; /* 悬浮浅蓝色 */
  color: #1890ff; /* 悬浮文字色 */
}

/* 已激活状态 */
.menu-item-container.active {
  background-color: #1890ff; /* 激活主色 */
  color: #fff; /* 激活文字色 */
}

/* 折叠状态下的样式适配 */
:deep(.el-menu--collapse) .menu-item-container {
  justify-content: center;
  padding: 0;
}
</style>
