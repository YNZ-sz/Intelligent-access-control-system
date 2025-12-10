<template>
  <div class="p-6 border rounded bg-blue-50">
    <h3 class="text-lg font-semibold mb-3">异步懒加载组件</h3>
    <p class="text-gray-700">
      这个组件是点击按钮后才开始加载的，加载过程中会显示 "组件加载中..." 占位符。
      属于「用户触发式」组件懒加载，适合非首屏必需的组件。
    </p>
    <div class="mt-4 p-3 bg-white rounded shadow-sm">组件加载完成！🎉</div>
  </div>
</template>

<script setup lang="ts">
// 组件内容可自定义
</script>
