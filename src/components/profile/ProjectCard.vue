<template>
  <div
    class="bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 opacity-0 translate-y-8 duration-700"
    ref="cardRef"
  >
    <div class="relative overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
      <p class="text-slate-300 text-sm mb-4 line-clamp-2">{{ description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      <a
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium"
      >
        查看详情
        <ArrowRight class="w-4 h-4 ml-1" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps<{
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}>()

const cardRef = ref<HTMLElement | null>(null)

// 监听元素可见性，触发动画
onMounted(() => {
  if (cardRef.value) {
    useIntersectionObserver(
      cardRef,
      ([entry]) => {
        // 修复类型错误：添加 entry 存在性判断
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
