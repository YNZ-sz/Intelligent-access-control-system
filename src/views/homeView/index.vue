<template>
  <!-- 主内容区（滚动） -->
  <el-main class="flex-1 overflow-y-auto bg-white/70 backdrop-blur-sm rounded-xl p-6">
    <div class="mb-6">
      <h1 class="text-[clamp(1.5rem,3vw,2rem)] font-bold text-gray-800">
        欢迎回来，{{ userStore.piniausername }}！
      </h1>
      <p class="text-gray-500 mt-1">今天是 {{ new Date().toLocaleDateString() }}，祝您工作愉快～</p>
    </div>

    <!-- 数据卡片（网格布局） -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- 今日签到 -->
      <el-card class="bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">今日签到人数</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">128</h3>
            <p class="text-green-500 text-xs mt-1 flex items-center">
              <ArrowUp /> 8.2% <span class="text-gray-400 ml-1">较昨日</span>
            </p>
          </div>
          <div
            class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600"
          >
            <el-icon class="text-xl">
              <Avatar />
            </el-icon>
          </div>
        </div>
      </el-card>

      <!-- 今日缺勤 -->
      <el-card class="bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">今日缺勤人数</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">12</h3>
            <p class="text-red-500 text-xs mt-1 flex items-center">
              <ArrowDown /> 3.1% <span class="text-gray-400 ml-1">较昨日</span>
            </p>
          </div>
          <div
            class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600"
          >
            <el-icon class="text-xl"><CloseBold /></el-icon>
          </div>
        </div>
      </el-card>

      <!-- 本月考勤率 -->
      <el-card class="bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">本月考勤率</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">92.5%</h3>
            <p class="text-green-500 text-xs mt-1 flex items-center">
              <ArrowUp /> 1.8% <span class="text-gray-400 ml-1">较上月</span>
            </p>
          </div>
          <div
            class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
          >
            <el-icon class="text-xl">
              <PieChart />
            </el-icon>
          </div>
        </div>
      </el-card>

      <!-- 待处理审批 -->
      <el-card class="bg-white shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">待处理审批</p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">5</h3>
            <p class="text-yellow-500 text-xs mt-1 flex items-center">
              <Clock /> <span class="text-gray-400 ml-1">需今日处理</span>
            </p>
          </div>
          <div
            class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600"
          >
            <el-icon class="text-xl">
              <Document />
            </el-icon>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 最近操作 + 考勤统计图表（两列布局） -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 最近操作记录 -->
      <el-card class="bg-white shadow-sm lg:col-span-1">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-800">最近操作</h3>
          <a href="#" class="text-indigo-600 text-sm hover:underline">查看全部</a>
        </div>
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <el-avatar :size="24" class="bg-green-100 text-green-600 mt-0.5">
              <Check />
            </el-avatar>
            <div>
              <p class="text-gray-700 text-sm">您已完成今日签到</p>
              <p class="text-gray-400 text-xs mt-1">09:23:45</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <el-avatar :size="24" class="bg-blue-100 text-blue-600 mt-0.5">
              <Edit />
            </el-avatar>
            <div>
              <p class="text-gray-700 text-sm">修改了员工张三的考勤记录</p>
              <p class="text-gray-400 text-xs mt-1">昨天 16:45:12</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <el-avatar :size="24" class="bg-purple-100 text-purple-600 mt-0.5">
              <Download />
            </el-avatar>
            <div>
              <p class="text-gray-700 text-sm">导出了上月考勤报表</p>
              <p class="text-gray-400 text-xs mt-1">2025-11-08 10:12:33</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <el-avatar :size="24" class="bg-yellow-100 text-yellow-600 mt-0.5">
              <Bell />
            </el-avatar>
            <div>
              <p class="text-gray-700 text-sm">发布了新的考勤通知</p>
              <p class="text-gray-400 text-xs mt-1">2025-11-07 14:30:00</p>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 考勤统计图表 -->
      <el-card class="bg-white shadow-sm lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-800">近7天考勤统计</h3>
          <el-select v-model="chartType" placeholder="选择类型" size="small" class="w-36">
            <el-option label="签到人数" value="checkIn"></el-option>
            <el-option label="缺勤人数" value="absent"></el-option>
            <el-option label="考勤率" value="rate"></el-option>
          </el-select>
        </div>
        <!-- 图表容器（这里用占位，实际项目可集成 ECharts/Chart.js） -->
        <div class="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <el-icon class="text-gray-300 text-4xl mb-2">
              <BarChart />
            </el-icon>
            <p class="text-gray-400">考勤图表区域（集成 ECharts 后显示）</p>
          </div>
        </div>
      </el-card>
    </div>
  </el-main>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
