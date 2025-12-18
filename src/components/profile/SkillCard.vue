<template>
  <div
    class="bg-slate-800/30 backdrop-blur-sm p-3 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 group"
  >
    <div
      class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gradient-to-r from-purple-500 to-blue-500 group-hover:text-white transition-all"
    >
      <span class="text-purple-400 group-hover:text-white font-bold">{{ iconText }}</span>
    </div>
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000 ease-out"
        :style="{ width: `${props.percentage}%` }"
        ref="skillBarRef"
      ></div>
    </div>
    <p class="text-right text-sm text-slate-400 mt-2">{{ percentage }}%</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string
  percentage: number
  icon: 'html' | 'css' | 'js' | 'vue' | 'react' | 'node' | 'ts' | 'design'
}>()

const skillBarRef = ref<HTMLElement | null>(null)

// 图标文本映射
const iconTextMap = {
  html: 'HTML',
  css: 'CSS',
  js: 'JS',
  vue: 'Vue',
  react: 'React',
  node: 'Node',
  ts: 'TS',
  design: 'UI',
}

const iconText = iconTextMap[props.icon]

// 暴露给父组件的方法（用于触发动画）
defineExpose({
  animateSkillBar: () => {
    if (skillBarRef.value) {
      skillBarRef.value.style.width = `${props.percentage}%`
    }
  },
})
</script>
