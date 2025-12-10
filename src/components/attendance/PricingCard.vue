<template>
  <div
    class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 relative"
    :class="isPopular ? 'border-blue-500/30 scale-105 z-10' : ''"
    ref="cardRef"
  >
    <div
      v-if="isPopular"
      class="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-1 text-sm font-medium"
    >
      最受欢迎
    </div>
    <div class="p-6 pt-10">
      <h3 class="text-xl font-bold mb-2 text-white">{{ title }}</h3>
      <p class="text-slate-300 mb-6">{{ description }}</p>
      <div class="flex items-baseline mb-6">
        <span class="text-4xl font-bold text-white">{{ price }}</span>
        <span class="text-slate-300 ml-2">{{ period }}</span>
      </div>
      <ul class="space-y-3 mb-8">
        <!-- 修复：直接渲染默认插槽，不嵌套额外 slot -->
        <slot></slot>
      </ul>
      <el-button
        class="w-full py-3 rounded-xl transition-all duration-300"
        :class="[
          isPopular
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0'
            : 'bg-transparent hover:bg-white/10 text-white border border-white/20',
        ]"
      >
        立即选择
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Check } from '@element-plus/icons-vue'

const props = defineProps<{
  title: string
  description: string
  price: string | number
  period: string
  isPopular?: boolean
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
          cardRef.value?.classList.remove('opacity-0', 'translate-y-12')
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
  transform: translateY(48px);
  transition: all 0.7s ease-out;
}
</style>
