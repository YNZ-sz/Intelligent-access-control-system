<template>
  <div class="bg-white/70 rounded-xl overflow-hidden" style="min-height: calc(100vh - 120px)">
    <!-- 顶部用户信息栏 -->
    <header class="py-6 px-8">
      <div class="flex items-center gap-4">
        <el-avatar :size="60" class="bg-gray-200 text-gray-500">
          <UserFilled />
        </el-avatar>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">啊洲</h1>
          <div class="text-gray-500">{{ userInfo.signature }}</div>
        </div>
        <div class="ml-auto flex items-center">
          <span class="text-gray-600 mr-3 whitespace-nowrap">被关注: 233</span>

          <div class="flex items-center space-x-4 bg-gray-400 p-3 rounded-xl">
            <!-- 自定义样式的下拉选择器 -->
            <el-popover
              trigger="click"
              placement="bottom-end"
              :width="180"
              popper-class="custom-popover"
            >
              <template #reference>
                <div class="flex items-center space-x-2 cursor-pointer">
                  <span class="hidden sm:inline-block">
                    {{ currentView === 'self' ? '视角: 自己视角' : '视角: 访客视角' }}
                  </span>
                  <el-icon class="text-gray-600">
                    <ArrowDown />
                  </el-icon>
                </div>
              </template>
              <template #default>
                <div class="space-y-1">
                  <!-- 自己视角选项 -->
                  <div
                    class="rounded-md p-2 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between"
                    @click="handleViewChange('self')"
                  >
                    <span class="text-heading">自己视角</span>
                    <el-icon v-if="currentView === 'self'" class="text-blue-500">
                      <Check />
                    </el-icon>
                  </div>

                  <!-- 访客视角选项 -->
                  <div
                    class="rounded-md p-2 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between"
                    @click="handleViewChange('other')"
                  >
                    <span class="text-heading">访客视角</span>
                    <el-icon v-if="currentView === 'other'" class="text-blue-500">
                      <Check />
                    </el-icon>
                  </div>
                </div>
              </template>
            </el-popover>
          </div>
        </div>
      </div>
    </header>

    <!-- 主体内容区 -->
    <main class="px-8 pb-12">
      <!-- 标签栏 -->
      <el-tabs v-model="activeTab" class="mb-6">
        <el-tab-pane label="主页" name="home" class="flex flex-wrap items-start gap-3">
          <!-- 用户卡片 -->
          <el-card class="w-80 bg-white rounded-xl shadow-sm mb-4">
            <template #header>
              <div class="flex justify-between items-center">
                <h3 class="font-bold text-gray-800">我的资料</h3>
              </div>
            </template>
            <div class="space-y-3 p-2">
              <div class="flex items-center">
                <el-tag type="info" class="mr-2 text-xs">UID</el-tag>
                <span>{{ userInfo.uid }}</span>
              </div>
              <div class="flex items-center">
                <el-tag type="info" class="mr-2 text-xs">用户</el-tag>
                <span>{{ userInfo.username }}</span>
              </div>
              <div class="flex items-center">
                <el-tag type="info" class="mr-2 text-xs">手机号</el-tag>
                <span>{{ userInfo.phone }}</span>
              </div>
              <div class="flex items-center">
                <el-tag type="info" class="mr-2 text-xs">昵称</el-tag>
                <span>{{ userInfo.nickname }}</span>
              </div>
              <div class="flex items-center">
                <el-tag type="info" class="mr-2 text-xs">性别</el-tag>
                <el-select v-model="userInfo.gender" placeholder="选择性别" size="small">
                  <el-option label="男" value="male" />
                  <el-option label="女" value="female" />
                  <el-option label="保密" value="secret" />
                </el-select>
              </div>
              <div class="flex items-center">
                <el-tag type="info" class="mr-2 text-xs">签名</el-tag>
                <el-input v-model="userInfo.signature" placeholder="输入签名" size="small" />
              </div>
            </div>
          </el-card>
          <!-- 编辑卡片 -->
          <el-card class="w-80 bg-white rounded-xl shadow-sm">
            <template #header>
              <h3 class="font-bold text-gray-800">账号安全</h3>
            </template>
            <div class="p-4 space-y-3">
              <div class="flex items-center justify-between">
                <span>修改密码</span>
                <el-button type="text" text-color="#409EFF" size="small">
                  <Edit class="mr-1" /> 操作
                </el-button>
              </div>
              <div class="flex items-center justify-between">
                <span>绑定手机号</span>
                <el-button type="text" text-color="#409EFF" size="small">
                  <Edit class="mr-1" /> 操作
                </el-button>
              </div>
              <div class="flex items-center justify-between">
                <span>登录设备管理</span>
                <el-button type="text" text-color="#409EFF" size="small">
                  <View class="mr-1" /> 查看
                </el-button>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="打卡信息" name="card"><card /></el-tab-pane>
        <el-tab-pane label="我的收藏" name="favorites" />
      </el-tabs>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getuserinfo } from '@/api/user' // 导入接口
import { useUserStore } from '@/stores/user'
import card from '@/components/card/card.vue'
// 响应式变量
const userStore = useUserStore()
const activeTab = ref('home')
const viewMode = ref('self')
const signature = ref('')
const gender = ref('')
const currentView = ref('self')
let userInfo: any = ref({
  uid: '112',
  username: 'qweqwe',
  nickname: '啊洲',
  phone: '18922329123',
  gender: 'secret',
  signature: '给自己起一个中二的签名',
  avatar: '', // 头像地址，初始为空
})

onMounted(() => {
  getuser()
  if (userStore.userInfo_carf) {
    activeTab.value = 'card'
  }
})
onUnmounted(() => {
  userStore.userInfo_carf = false
})
const getuser = async () => {
  try {
    const res: any = await getuserinfo() // axiosRes 是 AxiosResponse 类型
    console.log(res)
    if (res.code !== 200) {
      throw new Error(res.msg)
    }

    userInfo.value.uid = res.data.id
    userInfo.value.username = res.data.username
    userInfo.value.nickname = res.data.username
    userInfo.value.phone = res.data.phone
  } catch (err) {
    console.error('用户信息获取失败', err)
  }
}
const handleViewChange = (view: 'self' | 'other') => {
  currentView.value = view
  // 这里可以添加视角切换后的逻辑（如刷新页面、请求不同视角的数据等）
  ElMessage.success(`已切换至${view === 'self' ? '自己' : '访客'}视角`)
}
</script>

<style scoped>
/* 自定义日历方块样式 */
:deep(.bg-gray-400) {
  background-color: #e5e7eb !important;
}
:deep(.bg-green-400) {
  background-color: #86efac !important;
}
:deep(.bg-emerald-400) {
  background-color: #34d399 !important;
}
:deep(.bg-teal-400) {
  background-color: #2dd4bf !important;
}
:deep(.bg-rose-400) {
  background-color: #fda4af !important;
}
</style>
