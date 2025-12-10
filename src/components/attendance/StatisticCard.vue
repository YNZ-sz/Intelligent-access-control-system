<template>
  <div
    class="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
    ref="cardRef"
  >
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-slate-300 text-lg font-medium">{{ title }}</h3>
      <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
        <component :is="icon" class="w-5 h-5 text-blue-400" />
      </div>
    </div>
    <div class="flex items-baseline">
      <span class="text-4xl md:text-5xl font-bold text-white">{{ value }}</span>
      <span class="ml-2 text-green-400 text-sm flex items-center" v-if="growth">
        <TrendUp class="w-3 h-3 mr-1" />
        {{ growth }}
      </span>
    </div>
    <p class="text-slate-400 text-sm mt-2">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
// import { TrendUp } from '@element-plus/icons-vue';
import type { Component } from 'vue'

const props = defineProps<{
  title: string
  value: string | number
  subtitle: string
  icon: Component
  growth?: string
}>()

const cardRef = ref<HTMLElement | null>(null)

// 滚动动画
onMounted(() => {
  if (cardRef.value) {
    useIntersectionObserver(
      cardRef,
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          cardRef.value?.classList.add('opacity-100', 'scale-100')
          cardRef.value?.classList.remove('opacity-0', 'scale-95')
        }
      },
      { threshold: 0.1 },
    )
  }
})
</script>

<style scoped>
/* 初始状态 */
div[ref='cardRef'] {
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.5s ease-out;
}
</style>
