<template>
  <div class="p-4">
    <!-- 实时打卡区域 -->
    <div class="mb-8 bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- 打卡状态 -->
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock class="h-6 mr-2 text-purple-600" />
            今日打卡
          </h2>
          <p class="text-gray-500 mb-2">当前状态</p>
          <div
            :class="`text-2xl font-bold ${currentStatus === '未打卡' ? 'text-red-500' : 'text-green-500'}`"
          >
            {{ currentStatus }}
          </div>
          <p class="text-sm text-gray-400 mt-1">
            {{ currentStatus === '已打卡' ? `今日${checkInTime}` : '请完成今日打卡' }}
          </p>
        </div>

        <!-- 打卡按钮 -->
        <div class="flex gap-4 items-center">
          <el-button
            type="primary"
            icon="Top"
            size="large"
            class="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 border-none rounded-full px-8 hover:scale-105"
            @click="handleCheckIn('in')"
            :disabled="currentStatus === '已打卡'"
          >
            上班打卡
          </el-button>
          <el-button
            type="primary"
            icon="Bottom"
            size="large"
            class="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 border-none rounded-full px-8 hover:scale-105"
            @click="handleCheckIn('out')"
            :disabled="currentStatus !== '已打卡'"
          >
            下班打卡
          </el-button>
        </div>
      </div>
    </div>

    <!-- 打卡记录区域 -->
    <div class="mb-8 bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800 flex items-center">
          <Document class="mr-2 h-6 text-blue-500" />
          打卡记录
        </h2>
        <el-date-picker
          v-model="recordDate"
          type="date"
          placeholder="选择日期"
          size="small"
          @change="fetchDailyRecords"
        />
      </div>

      <!-- 记录列表 -->
      <el-table
        :data="dailyRecords"
        border
        stripe
        :header-cell-class-name="'bg-gray-50 text-gray-700'"
        class="rounded-lg overflow-hidden"
        empty-text="今日暂无打卡记录"
      >
        <el-table-column label="打卡类型" prop="checkType">
          <template #default="scope">
            <el-tag :type="scope.row.checkType === 'in' ? 'success' : 'info'">
              {{ scope.row.checkType === 'in' ? '上班' : '下班' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="打卡时间" prop="checkTime" />
        <el-table-column label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'normal' ? 'success' : 'warning'">
              {{
                scope.row.status === 'normal'
                  ? '正常'
                  : scope.row.status === 'late'
                    ? '迟到'
                    : '早退'
              }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 月度统计区域 -->
    <div class="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
      <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <PieChart class="mr-2 h-6 text-orange-500" />
        {{ currentYear }}年{{ currentMonth }}月统计
      </h2>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div
          class="bg-green-50 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
        >
          <p class="text-gray-500 text-sm">正常天数</p>
          <p class="text-2xl font-bold text-green-600 mt-1">{{ monthStats.normalDays }}</p>
        </div>
        <div
          class="bg-yellow-50 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
        >
          <p class="text-gray-500 text-sm">迟到次数</p>
          <p class="text-2xl font-bold text-yellow-600 mt-1">{{ monthStats.lateCount }}</p>
        </div>
        <div
          class="bg-red-50 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
        >
          <p class="text-gray-500 text-sm">早退次数</p>
          <p class="text-2xl font-bold text-red-600 mt-1">{{ monthStats.earlyCount }}</p>
        </div>
        <div
          class="bg-green-50 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
        >
          <p class="text-gray-500 text-sm">实际打卡</p>
          <p class="text-2xl font-bold text-blue-600 mt-1">{{ monthStats.checkinDays }}</p>
        </div>
        <div
          class="bg-blue-50 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
        >
          <p class="text-gray-500 text-sm">请假天数</p>
          <p class="text-2xl font-bold text-blue-600 mt-1">{{ monthStats.leaveDays }}</p>
        </div>
        <div
          class="bg-gray-100 rounded-xl p-4 text-center transform hover:scale-105 transition-transform"
        >
          <p class="text-gray-500 text-sm">旷工天数</p>
          <p class="text-2xl font-bold text-blue-600 mt-1">{{ monthStats.absentDays }}</p>
        </div>
      </div>
    </div>
  </div>

  <addfile
    v-if="isDialogVisible"
    @visible="isDialogVisible = $event"
    @success="handleCheckIn2($event)"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { daCard, getDayCard, getmonthdate } from '@/api/cardApi'
import addfile from './addfile.vue'

interface AttendanceRecord {
  id: number
  checkType: 'in' | 'out'
  checkTime: string
  status: 'normal' | 'late' | 'early'
  // 可补充其他字段（如id）
  certificateUrl?: string
}
// 响应式变量
const currentStatus = ref('未打卡') // 今日打卡状态
const checkInTime = ref('') // 今日打卡时间
const recordDate = ref(new Date()) // 记录查询日期
const dailyRecords = ref<AttendanceRecord[]>([]) // 当日打卡记录
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const monthStats = ref({
  normalDays: 0,
  lateCount: 0,
  earlyCount: 0,
  absentDays: 0,
  leaveDays: 0,
  checkinDays: 0,
  month: '2022-11',
}) // 月度统计
const isDialogVisible = ref(false)
const inorout = ref<'in' | 'out'>('in')
// 页面加载时获取数据
onMounted(() => {
  fetchDailyRecords()
  fetchMonthStats()
})

// 上班/下班打卡
const handleCheckIn = (type: 'in' | 'out') => {
  isDialogVisible.value = true
  inorout.value = type
}
const handleCheckIn2 = async (img: File) => {
  try {
    const formData = new FormData()
    formData.append('certificateFile', img)
    // 可附加其他参数
    formData.append('checkType', inorout.value)
    const res: any = await daCard(formData)
    if (res.code === 0) {
      currentStatus.value = res.data.checkType === 'in' ? '已打卡' : '已下班'
      checkInTime.value = res.data.checkTime
      ElMessage.success(`成功${inorout.value === 'in' ? '上班' : '下班'}打卡`)
      fetchDailyRecords() // 刷新记录
    }
  } catch (err: any) {
    if (err.msg == '今天已打上班卡，无需重复打卡') {
      currentStatus.value = '已打卡'
    }
    ElMessage.error('打卡失败，请重试')
  }
}
// 获取当日打卡记录
const fetchDailyRecords = async () => {
  try {
    const dateStr = recordDate.value.toISOString().split('T')[0]
    const res: any = await getDayCard()
    console.log(res)
    if (res.code !== 200) {
      dailyRecords.value.push({
        id: 13,
        checkTime: '2025-11-22',
        checkType: 'in',
        status: 'normal',
      })

      throw new Error(res.msg)
    }
    dailyRecords.value.push(res.data)
    if (dailyRecords.value.some((item) => item.checkType === 'in')) {
      currentStatus.value = '已打卡'
      const inRecord = dailyRecords.value.find((item) => item.checkType === 'in')
      if (inRecord) {
        // 增加非空判断（避免find返回undefined）
        checkInTime.value = inRecord.checkTime
      }
    } else {
      currentStatus.value = '未打卡'
    }
  } catch (err) {
    ElMessage.error(err || '获取记录失败')
  }
}

// 获取月度统计
const fetchMonthStats = async () => {
  try {
    const res: any = await getmonthdate(currentYear.value, currentMonth.value)
    if (res.code !== 200) {
      throw new Error(res.msg)
    }
    monthStats.value = res.data
  } catch (err) {
    ElMessage.error(err || '获取月份统计失败')
  }
}
</script>

<style scoped>
/* 自定义动画 */
/* @keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
} */
.hover\:scale-105:hover {
  animation: pulse 0.5s ease-in-out;
}
</style>
