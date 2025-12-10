<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div class="flex items-center">
        <img
          src="https://picsum.photos/200/200?random=1"
          alt="用户头像"
          class="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h1 class="text-lg font-bold">下午好，欢迎登录</h1>
          <p class="text-sm opacity-80">一站式智能营销解决方案，帮助你高效管理客户、快速提升业绩</p>
        </div>
      </div>
      <div class="w-64 h-32">
        <!-- 占位插画 -->
        <img
          src="https://picsum.photos/400/200?random=2"
          alt="插画"
          class="w-full h-full object-cover"
        />
      </div>
    </header>

    <!-- 今日核心指标 -->
    <section class="p-4 bg-white mb-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-base font-semibold">今日核心指标</h2>
        <div class="text-sm text-gray-500">2021-08-01</div>
      </div>
      <div class="grid grid-cols-5 gap-4">
        <div class="p-3 bg-white rounded shadow">
          <p class="text-sm text-gray-500">今日 UV</p>
          <p class="text-2xl font-bold">67</p>
          <p class="text-sm text-red-500">同比上周 8.63% ▲</p>
        </div>
        <div class="p-3 bg-white rounded shadow">
          <p class="text-sm text-gray-500">昨日 UV</p>
          <p class="text-2xl font-bold">569</p>
          <p class="text-sm text-red-500">同比上周 14.07% ▲</p>
        </div>
        <div class="p-3 bg-white rounded shadow">
          <p class="text-sm text-gray-500">新用户</p>
          <p class="text-2xl font-bold">45</p>
          <p class="text-sm text-green-500">同比上周 23.36 ▼</p>
        </div>
        <div class="p-3 bg-white rounded shadow">
          <p class="text-sm text-gray-500">近7日 UV</p>
          <p class="text-2xl font-bold">366</p>
          <p class="text-sm text-gray-500"></p>
        </div>
        <div class="p-3 bg-white rounded shadow">
          <p class="text-sm text-gray-500">近30日 UV</p>
          <p class="text-2xl font-bold">5639</p>
          <p class="text-sm text-gray-500"></p>
        </div>
      </div>
    </section>

    <!-- 流量统计 -->
    <section class="p-4 bg-white mb-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="p-3">
          <p class="text-sm text-gray-500">总流量(人次)</p>
          <p class="text-xl font-bold">601,986,875</p>
        </div>
        <div class="p-3">
          <el-progress
            type="circle"
            :percentage="61.5"
            :format="(percentage: any) => `付费流量<br>${percentage}%`"
          />
          <p class="text-sm text-gray-500">370,221,928 占比61.5%</p>
        </div>
        <div class="p-3">
          <el-progress
            type="circle"
            :percentage="30"
            :format="(percentage: any) => `免费流量<br>${percentage}%`"
          />
          <p class="text-sm text-gray-500">180,596,062 占比30%</p>
        </div>
        <div class="p-3">
          <el-progress
            type="circle"
            :percentage="8.5"
            :format="(percentage: any) => `其他流量<br>${percentage}%`"
          />
          <p class="text-sm text-gray-500">51,168,884 占比8.5%</p>
        </div>
      </div>
    </section>

    <!-- 月数据趋势、排查代办、产品销售好评度 -->
    <section class="grid grid-cols-3 gap-4 px-4 mb-4">
      <!-- 月数据趋势 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold">月数据趋势</h3>
          <el-icon class="text-gray-400"><more /></el-icon>
        </div>
        <div>
          <p class="text-xl font-bold mb-2">45.82%</p>
          <p class="text-sm text-red-500">周同比 ▲ 6.47% 月同比 ▲ 6.47%</p>
          <p class="text-xs text-gray-500">参考线 55%</p>
        </div>
        <el-radio-group v-model="radio" class="mt-2">
          <el-radio label="1">日</el-radio>
          <el-radio label="2">周</el-radio>
          <el-radio label="3">月</el-radio>
        </el-radio-group>
        <!-- 图表占位 -->
        <div class="w-full h-32 bg-gray-100 mt-2"></div>
      </div>

      <!-- 排查代办提示 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold">排查代办提示</h3>
          <el-icon class="text-gray-400"><more /></el-icon>
        </div>
        <el-alert title="未出单数远高于往期，请排查出货流程" type="warning" show-icon class="mb-2">
          <template #desc>2021-08-01</template>
        </el-alert>
        <el-alert title="支付率急剧下降，请排查" type="warning" show-icon>
          <template #desc>2021-08-01</template>
        </el-alert>
        <el-alert title="同期未出单数较上月同比 10.23%" type="error" show-icon class="mt-4">
          <template #title>预警提示</template>
        </el-alert>
      </div>

      <!-- 产品销售好评度 -->
      <div class="bg-white p-4 rounded shadow">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold">产品销售好评度</h3>
          <el-select v-model="selectedMonth" placeholder="选一个月">
            <el-option label="近一个月" value="1" />
            <el-option label="近三个月" value="3" />
            <el-option label="近一年" value="12" />
          </el-select>
        </div>
        <el-table :data="productData" border style="width: 100%">
          <el-table-column prop="name" label="产品" />
          <el-table-column prop="rate" label="好评度">
            <template #default="scope">
              <el-progress :percentage="scope.row.rate" show-text />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- 成员管理、今日总订单、未完成待办、日历 -->
    <section class="grid grid-cols-4 gap-4 px-4 mb-4">
      <!-- 成员管理 -->
      <div class="col-span-2 bg-white p-4 rounded shadow">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold">成员管理</h3>
          <div>
            <el-button type="primary" size="small">添加成员</el-button>
            <el-button size="small">批量导出</el-button>
          </div>
        </div>
        <el-table :data="memberData" border style="width: 100%">
          <el-table-column prop="name" label="成员名称" />
          <el-table-column prop="email" label="邮箱地址" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.statusType">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default>
              <el-button type="text" size="small">操作</el-button>
              <el-button type="text" size="small">更多</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 今日总订单 -->
      <div class="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
        <el-icon class="text-blue-500 text-2xl mb-2"><shopping-cart-full /></el-icon>
        <p class="text-2xl font-bold">736</p>
        <p class="text-sm text-gray-500">今日总订单</p>
      </div>

      <!-- 未完成待办 -->
      <div class="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
        <el-icon class="text-blue-500 text-2xl mb-2"><edit-pen /></el-icon>
        <p class="text-2xl font-bold">12</p>
        <p class="text-sm text-gray-500">未完成待办</p>
      </div>

      <!-- 日历 -->
      <div class="bg-white p-4 rounded shadow">
        <el-calendar v-model="currentDate" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { More, ShoppingCartFull, EditPen } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const radio = ref('1')
const selectedMonth = ref('1')
const currentDate = ref(new Date())

const productData = ref([
  { name: '图马思特', rate: 88 },
  { name: 'FANATEC', rate: 89 },
  { name: 'HORI', rate: 85 },
  { name: 'Logitech - Ske...', rate: 80 },
  { name: 'PXN莱仕达', rate: 83 },
])

const memberData = ref([
  { name: '申泰', email: 'mojojv@lajkljcnp', status: '成功', statusType: 'success' },
  { name: '占叶', email: 'soofku@isalku.fn', status: '进行中', statusType: 'info' },
  { name: '豆媛圆', email: 'gomnaf@zorf.fn', status: '失败', statusType: 'danger' },
  { name: '琚义晶', email: 'jaxKvura@ruzckna', status: '异常', statusType: 'warning' },
  { name: '费珍', email: 'gopx@zewepasur.r', status: '未开始', statusType: 'default' },
])

const handleClick = () => {
  ElMessage('Button clicked!')
}
</script>

<style scoped>
/* 可根据需要添加自定义样式 */
</style>

<style>
/* Tailwind 基础样式引入（若已在全局配置可忽略） */
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
