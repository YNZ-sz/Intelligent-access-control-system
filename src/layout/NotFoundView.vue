<!-- src/views/NotFoundView.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
    <!-- 半透明背景装饰 -->
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 opacity-50"></div>

    <!-- 404 核心内容 -->
    <div class="relative z-10 text-center max-w-md">
      <!-- 404 大图标 -->
      <div class="mb-6">
        <el-icon class="text-indigo-600" style="font-size: 8rem; opacity: 0.8">
          <WarningFilled />
        </el-icon>
      </div>

      <!-- 文字提示 -->
      <h1 class="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-800 mb-2">404</h1>
      <p class="text-gray-500 text-lg mb-8">抱歉，你访问的页面不存在或已被移除～</p>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <!-- 返回首页按钮 -->
        <el-button
          type="primary"
          class="py-3 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none"
          @click="goToHome"
        >
          <el-icon class="mr-2"><HomeFilled /></el-icon>
          返回首页
        </el-button>

        <!-- 刷新按钮（可选） -->
        <el-button
          type="default"
          class="py-3 px-8 border-gray-300 hover:border-indigo-300 text-gray-700"
          @click="refreshPage"
        >
          <el-icon class="mr-2"><Refresh /></el-icon>
          刷新页面
        </el-button>
      </div>

      <!-- 底部辅助提示 -->
      <p class="text-gray-400 text-sm mt-8">可能的原因：链接错误 / 页面已删除 / 权限不足</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// import { ElButton, ElIcon } from 'element-plus'
// import { WarningFilled, HomeFilled, RefreshFilled } from '@element-plus/icons-vue'

const router = useRouter()

// 返回首页
const goToHome = () => {
  router.push('/main/home')
}

// 刷新当前页面
const refreshPage = () => {
  window.location.reload()
}
</script>

<style scoped>
/* 优化图标动画效果 */
:deep(.el-icon) {
  transition: transform 0.3s ease;
}
:deep(.el-button:hover .el-icon) {
  transform: scale(1.1);
}
</style>
