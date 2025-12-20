<!-- src/views/loginView.vue -->
<template>
  <!-- 全屏背景容器 -->
  <div
    class="min-h-screen bg-cover bg-center flex items-center justify-center"
    :style="{ backgroundImage: `url(${loginBg})` }"
  >
    <!-- 半透明遮罩 -->
    <div class="absolute inset-0 bg-black/30"></div>

    <!-- 登录卡片（居中 + 阴影） -->
    <div
      v-if="islogin == 1"
      class="relative w-full max-w-md p-8 bg-white/95 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-indigo-500/20"
    >
      <!-- 卡片顶部图标 -->
      <div class="flex justify-center mb-6">
        <img src="@/assets/images/loginLogo.png" alt="logo" class="z-10 w-20 h-auto rounded-2xl" />
      </div>
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">智慧考勤系统入口</h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- 账号输入框 -->
        <el-input
          v-model.trim="username"
          placeholder="请输入账号"
          prefix="ElIconShip"
          :border="false"
          class="w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          autocomplete="off"
        />

        <!-- 密码输入框 -->
        <el-input
          v-model.trim="password"
          placeholder="请输入密码"
          prefix="ElIconShip"
          :border="false"
          type="password"
          class="w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />

        <!-- 错误提示（带动画） -->
        <div v-if="errorMsg" class="error text-red-500 text-sm text-center py-2 animate-fadeIn">
          <!-- <el-icon class="inline mr-1">el-icon-warning</el-icon> -->
          <el-icon><WarnTriangleFilled /></el-icon>
          {{ errorMsg }}
        </div>

        <!-- 登录按钮（渐变 + 加载动画） -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <el-loading v-if="isLoading" type="mini" class="mr-2" />
          <span v-if="isLoading">登录中...</span>
          <span v-else>立即登录</span>
        </button>

        <!-- 底部辅助文字 -->
        <div
          class="text-center text-blue-500 text-sm mt-2 cursor-pointer hover:text-blue-700 hover:underline transition-colors duration-200"
          @click="
            () => {
              islogin = 2
              errorMsg = ''
              password = ''
              username = ''
            }
          "
        >
          <span>暂无账号？立即注册</span>
        </div>
      </form>
    </div>

    <!-- 手机号注册卡片（居中 + 阴影） -->
    <div
      v-else-if="islogin == 2"
      class="relative w-full max-w-md p-8 bg-white/95 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-indigo-500/20"
    >
      <h2 class="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800 text-center mb-6">
        手机号注册
      </h2>

      <!-- 完全匹配你的表单写法：form + space-y-6 -->
      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- 手机号输入框（匹配无边框、灰色背景风格） -->
        <div class="form-item">
          <el-input
            v-model.trim="phone"
            placeholder="请输入手机号码"
            prefix="Phone"
            :border="false"
            type="tel"
            maxlength="11"
            class="w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            autocomplete="off"
          />
        </div>

        <!-- 验证码输入框 + 获取按钮（保持布局一致） -->
        <div class="form-item">
          <div class="flex gap-3">
            <el-input
              v-model.trim="code"
              placeholder="请输入6位验证码"
              prefix="Code"
              :border="false"
              maxlength="6"
              class="flex-1 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              autocomplete="off"
            />
            <el-button
              @click="getVerificationCode"
              :disabled="countdown > 0 || isLoading"
              type="text"
              class="w-32 rounded-lg font-medium transition-all"
              :class="[
                countdown > 0
                  ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200',
              ]"
            >
              {{ countdown > 0 ? `${countdown}s后重新获取` : '获取验证码' }}
            </el-button>
          </div>
        </div>

        <!-- 协议勾选（保持文字样式一致） -->
        <div class="form-item flex items-center text-sm">
          <el-checkbox v-model="isAgreed" :border="false" class="text-blue-500">
            我已阅读并同意
            <a href="#" class="text-blue-500 hover:underline">用户协议</a>
            和
            <a href="#" class="text-blue-500 hover:underline">隐私政策</a>
          </el-checkbox>
        </div>

        <!-- 错误提示（完全匹配你的动画和样式） -->
        <div v-if="errorMsg" class="error text-red-500 text-sm text-center py-2 animate-fadeIn">
          <el-icon><WarnTriangleFilled /></el-icon>
          {{ errorMsg }}
        </div>

        <!-- 注册按钮（蓝色渐变 + 加载动画，匹配你的风格） -->
        <button
          type="submit"
          :disabled="isLoading || !isAgreed"
          class="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <el-loading v-if="isLoading" type="mini" class="mr-2" />
          <span v-if="isLoading">注册中...</span>
          <span v-else>立即注册</span>
        </button>

        <!-- 底部辅助文字（匹配你的写法） -->
        <div class="text-center text-gray-500 text-sm mt-2">
          已有账号？
          <span
            @click="islogin = 1"
            class="text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
          >
            立即登录
          </span>
        </div>
      </form>
    </div>

    <!-- 注册卡片（居中 + 阴影） -->

    <div
      v-else-if="islogin == 3"
      class="relative w-full max-w-md p-8 bg-white/95 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-indigo-500/20"
    >
      <!-- 卡片顶部图标 -->
      <div class="flex justify-center mb-6">
        <el-avatar :size="80" class="bg-indigo-600 text-white shadow-lg"> <DataLine /> </el-avatar>
      </div>
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">智能考勤系统</h2>

      <form @submit.prevent="handleRegister2" class="space-y-6">
        <!-- 账号输入框 -->
        <div class="form-item">
          <el-input
            v-model.trim="username"
            placeholder="请输入账号"
            prefix="ElIconShip"
            :border="false"
            class="w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            autocomplete="off"
          />
        </div>

        <!-- 密码输入框 -->
        <div class="form-item">
          <el-input
            v-model.trim="password"
            placeholder="请输入密码"
            prefix="ElIconShip"
            :border="false"
            type="password"
            class="w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div class="form-item">
          <el-input
            v-model.trim="confirmpassword"
            placeholder="请确认密码"
            prefix="ElIconShip"
            :border="false"
            type="password"
            class="w-full rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <!-- 错误提示（带动画） -->
        <div v-if="errorMsg" class="error text-red-500 text-sm text-center py-2 animate-fadeIn">
          <!-- <el-icon class="inline mr-1">el-icon-warning</el-icon> -->
          <el-icon><WarnTriangleFilled /></el-icon>
          {{ errorMsg }}
        </div>

        <!-- 登录按钮（渐变 + 加载动画） -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <el-loading v-if="isLoading" type="mini" class="mr-2" />
          <span v-if="isLoading">注册中...</span>
          <span v-else>立即注册</span>
        </button>

        <!-- 底部辅助文字 -->
        <div class="text-center text-gray-500 text-sm mt-2">
          <span>临时文本</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/user'
// 导入 Element Plus 组件和图标
import { ElInput, ElAvatar, ElIcon, ElLoading } from 'element-plus'
import { getcode, phoneregist } from '@/api/user' // 导入接口
import loginBg from '@/assets/images/loginBg.png'

// import {
//   UserSolid,
//   Lock,
//   Warning,
//   // 按需导入图标
// } from '@element-plus/icons-vue'

// // 注册全局图标（或在组件内局部使用）
// ElIcon.add({
//   'el-icon-user-solid': UserSolid,
//   'el-icon-lock': Lock,
//   'el-icon-warning': Warning,
// })

// 原有逻辑不变
const username = ref<string>('你舟')
const password = ref<string>('123123123')
const confirmpassword = ref<string>('')

const phone = ref('')
const code = ref('')
const isAgreed = ref(false)
const countdown = ref(0)
let timer: any = null

const errorMsg = ref<string>('')
const isLoading = ref<boolean>(false)

const router = useRouter()
const userStore = useUserStore()

const islogin = ref<number>(1)

watch(username, (newVal) => {
  console.log('账号实时变化：', newVal) // 输入时控制台会打印最新值
})
const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = '账号或密码不能为空'
    return
  }

  try {
    isLoading.value = true
    await userStore.login(username.value, password.value)
    console.log('成功，页面提示')
  } catch (err: any) {
    errorMsg.value = err || '登录失败，请检查手机号或验证码'
  } finally {
    isLoading.value = false
  }
}

const getVerificationCode = async () => {
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    errorMsg.value = '请输入正确的11位手机号'
    return
  }

  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
  try {
    const res: any = await getcode(phone.value)
    console.log(res)
    if (res.code != 200) {
      throw new Error(res.msg)
    }
  } catch (err: any) {
    errorMsg.value = err || '验证码接收失败'
  }
}
const handleRegister = () => {
  islogin.value = 3
  errorMsg.value = ''
  password.value = ''
  username.value = ''
  confirmpassword.value = ''
}
const handleRegister2 = async () => {
  // 表单校验
  if (!phone.value) {
    errorMsg.value = '请输入手机号码'
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    errorMsg.value = '请输入正确的11位手机号'
    return
  }
  if (!code.value || code.value.length !== 6) {
    errorMsg.value = '请输入6位数字验证码'
    return
  }
  if (!password.value || password.value.length < 6) {
    errorMsg.value = '密码长度不能少于6位'
    return
  }
  if (password.value !== confirmpassword.value) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }
  try {
    isLoading.value = true
    let res: any = await phoneregist(username.value, password.value, phone.value, code.value)
    console.log(res)
    if (res.code != 200) {
      throw new Error(res.msg)
    }
  } catch (err: any) {
    errorMsg.value = err || '登录失败，请检查账号密码'
  } finally {
    isLoading.value = false
  }

  islogin.value = 1
  errorMsg.value = ''
  password.value = ''
  username.value = ''
}
</script>

<style scoped>
/* 自定义动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

/* 适配移动端输入框高度 */
@media (max-width: 480px) {
  .form-item input {
    padding: 12px !important;
  }
  .login-container {
    padding: 20px 16px !important;
  }
}

/* 解决 Element Plus 前缀图标垂直居中问题 */
:deep(.el-input__prefix) {
  align-items: center;
  color: #9ca3af;
}

/* 按钮加载动画居中 */
:deep(.el-loading-spinner) {
  margin-right: 8px;
}

/* 优化 Element Plus 组件样式，保持整体一致性 */
::v-deep(.el-checkbox__inner) {
  border-color: #9ca3af;
}
::v-deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #3b82f6;
  border-color: #3b82f6;
}
::v-deep(.el-button--text) {
  padding: 0;
}
</style>
