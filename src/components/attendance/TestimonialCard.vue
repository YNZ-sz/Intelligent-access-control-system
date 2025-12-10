<template>
  <div
    class="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
    ref="cardRef"
  >
    <div class="flex items-center mb-4">
      <img
        :src="avatar"
        alt="用户头像"
        class="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-500/30"
      />
      <div>
        <h4 class="text-white font-semibold">{{ name }}</h4>
        <p class="text-slate-400 text-sm">{{ position }}</p>
      </div>
    </div>
    <div class="flex mb-3">
      <StarFilled class="w-4 h-4 text-yellow-400" v-for="i in 5" :key="i" />
    </div>
    <p class="text-slate-300 italic leading-relaxed">"{{ content }}"</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { StarFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  name: string
  position: string
  content: string
  avatar: string
}>()

const cardRef = ref<HTMLElement | null>(null)

// 滚动动画
onMounted(() => {
  if (cardRef.value) {
    useIntersectionObserver(
      cardRef,
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          cardRef.value?.classList.add('opacity-100', 'translate-x-0')
          cardRef.value?.classList.remove('opacity-0', 'translate-x-8')
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
  transform: translateX(32px);
  transition: all 0.7s ease-out;
}
</style>
