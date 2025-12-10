<template>
  <div
    class="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 group"
    ref="cardRef"
  >
    <div
      class="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-500/30 transition-all"
    >
      <component
        :is="icon"
        class="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors"
      />
    </div>
    <h3 class="text-xl font-bold mb-3 text-white">{{ title }}</h3>
    <p class="text-slate-300 leading-relaxed">{{ description }}</p>
    <div
      class="mt-5 inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
    >
      了解更多
      <ArrowRight class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ArrowRight } from '@element-plus/icons-vue'
import type { Component } from 'vue'

const props = defineProps<{
  title: string
  description: string
  icon: Component
}>()

const cardRef = ref<HTMLElement | null>(null)

// 滚动动画
onMounted(() => {
  if (cardRef.value) {
    useIntersectionObserver(
      cardRef,
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          cardRef.value?.classList.add('opacity-100', 'translate-y-0')
          cardRef.value?.classList.remove('opacity-0', 'translate-y-8')
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
  transform: translateY(32px);
  transition: all 0.7s ease-out;
}
</style>
