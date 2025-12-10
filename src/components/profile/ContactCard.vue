<template>
  <a
    :href="link"
    :target="link ? '_blank' : '_self'"
    :rel="link ? 'noopener noreferrer' : ''"
    class="bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-all flex items-start gap-4"
  >
    <div
      class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-400"
    >
      <component :is="iconComponent" class="w-5 h-5" />
    </div>
    <div>
      <h4 class="font-semibold mb-1">{{ title }}</h4>
      <p class="text-slate-300 text-sm">{{ content }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { Phone, MapLocation } from '@element-plus/icons-vue'

const props = defineProps<{
  icon: 'email' | 'phone' | 'location'
  title: string
  content: string
  link?: string
}>()

// 图标组件映射
const iconMap = {
  email: Phone,
  phone: Phone,
  location: MapLocation,
}

const iconComponent = iconMap[props.icon]
</script>
