<template>
  <div id="app">
    <div id="progress-bar" class="progress-bar"></div>

    <!-- <ynzView /> -->
    <!-- <ynz2View /> -->
    <!-- <ynz2View /> -->
    <!-- <ynz5View /> -->
    <!-- <ynz6View /> -->
    <router-view />
  </div>
</template>

<script setup>
// import Navbar from './components/Navbar.vue'
// import ynzView from './views/ynzView.vue'
// import ynz2View from './views/ynz2View.vue'
// import ynz2View from './views/ynz2View.vue'
// import ynz5View from './views/ynz5View.vue'
import { onMounted } from 'vue' // 引入生命周期钩子，确保DOM挂载后执行
function simulateLoadingProgress() {
  const progressBar = document.getElementById('progress-bar')
  if (!progressBar) return // 避免元素不存在时报错




  let width = 0
              const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval)
      progressBar.style.width = '100%'
      setTimeout(() => {
        progressBar.style.display = 'none'
      }, 500)
    } else {
      width += 10
      progressBar.style.width = width + '%'
    }
  }, 200)
}

// 页面加载完成后触发进度条动画（也可以在需要的时机调用，比如请求开始时）

onMounted(() => {
  // 方式1：DOM挂载后直接触发
  simulateLoadingProgress()

  // 方式2：监听页面完全加载（包括资源）后触发
  // 页面加载完成后触发进度条动画（也可以在需要的时机调用，比如请求开始时）
  // window.addEventListener('load', simulateLoadingProgress)
})
</script>

<style scoped>
.progress-bar {
  height: 4px;
  background: #42b983;
  width: v-bind(progressWidth); /* 绑定进度宽度 */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: width 0.2s ease;
}
</style>
