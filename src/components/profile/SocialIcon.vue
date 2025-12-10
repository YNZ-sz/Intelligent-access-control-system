<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="flex items-center justify-center text-slate-300 hover:text-white transition-all rounded-full"
    :class="sizeClass"
    :style="iconBgStyle"
  >
    <!-- <component :is="iconComponent" :class="iconSizeClass" /> -->
  </a>
</template>

<script setup lang="ts">
// import { Github, Linkedin, Twitter, Codepen, Dribbble } from '@element-plus/icons-vue';

const props = defineProps<{
  icon: 'github' | 'linkedin' | 'twitter' | 'codepen' | 'dribbble'
  href: string
  size?: 'sm' | 'md' | 'lg'
}>()

// 图标组件映射
// const iconMap = {
//   github: Github,
//   linkedin: Linkedin,
//   twitter: Twitter,
//   codepen: Codepen,
//   dribbble: Dribbble,
// };

// 尺寸类映射
const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}

// 图标尺寸类映射
const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

// 计算属性
// const iconComponent = iconMap[props.icon];
const sizeClass = sizeClasses[props.size || 'md']
const iconSizeClass = iconSizeClasses[props.size || 'md']
const iconBgStyle = {
  background: 'rgba(71, 85, 105, 0.5)',
  '&:hover': {
    background: 'linear-gradient(to right, #a855f7, #3b82f6)',
  },
}
</script>
