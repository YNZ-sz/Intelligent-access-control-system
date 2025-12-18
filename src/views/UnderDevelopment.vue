<!-- src/views/UnderDevelopment.vue -->
<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div class="text-6xl mb-4">🚧</div>
    <h1 class="text-2xl font-bold text-gray-800">页面正在开发中...</h1>
    <p class="mt-2 text-gray-500">敬请期待，即将上线...</p>
    <button
      class="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      @click="$router.go(-1)"
    >
      返回上一页
    </button>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑，仅展示提示
</script>
