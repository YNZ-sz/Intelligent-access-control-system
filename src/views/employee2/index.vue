<template>
  <div class="container mx-auto px-4 py-3">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">员工列表</h1>

    <!-- 员工卡片列表（响应式网格布局） -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      @scroll="handleScroll"
      ref="listContainer"
      style="max-height: calc(100vh - 190px); overflow-y: auto"
    >
      <!-- 遍历员工数据，渲染卡片 -->
      <EmployeeCard
        v-for="employee in employeeStore.EmployeeState.list"
        :key="employee.id"
        :employee="employee"
      />

      <!-- 加载状态提示 -->
      <div v-if="employeeStore.EmployeeState.isLoading" class="col-span-full text-center py-4">
        <el-loading-spinner size="24" />
        <span class="ml-2 text-gray-500">加载中...</span>
      </div>

      <!-- 无更多数据提示 -->
      <div
        v-if="!employeeStore.EmployeeState.hasMore && employeeStore.EmployeeState.list.length > 0"
        class="col-span-full text-center py-4 text-gray-500"
      >
        已加载全部数据
      </div>

      <!-- 无数据提示 -->
      <div
        v-if="
          employeeStore.EmployeeState.list.length === 0 && !employeeStore.EmployeeState.isLoading
        "
        class="col-span-full text-center py-10 text-gray-500"
      >
        <el-empty description="暂无员工数据" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
import EmployeeCard from '@/components/EmployeeCard.vue'
// import { ElLoadingSpinner, ElEmpty } from 'element-plus';

// 获取Pinia实例
const employeeStore = useEmployeeStore()

// 列表容器ref（用于监听滚动事件）
const listContainer = ref<HTMLDivElement | null>(null)

// 页面挂载时加载初始数据
onMounted(() => {
  employeeStore.fetchEmployees()
})

// 滚动事件处理（判断是否滚动到底部）
const handleScroll = () => {
  const container = listContainer.value
  if (!container) return

  // 滚动高度 = 容器滚动距离 + 容器可视高度 >= 内容总高度 - 100px（提前加载阈值）
  const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100
  console.log(container.scrollTop, '  ', container.clientHeight, '  ', container.scrollHeight)
  if (isBottom) {
    // 滚动到底部，加载下一页
    employeeStore.fetchEmployees()
  }
}
</script>

<style scoped>
/* 滚动条美化（可选） */
::v-deep(.grid)::-webkit-scrollbar {
  width: 6px;
}

::v-deep(.grid)::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 3px;
}

::v-deep(.grid)::-webkit-scrollbar-thumb:hover {
  background-color: #d1d5db;
}
</style>
