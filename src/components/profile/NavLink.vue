<template>
  <a
    :href="href"
    class="relative py-2 transition-colors"
    :class="active ? 'text-white' : 'text-slate-400 hover:text-white'"
  >
    <slot></slot>
    <span
      class="absolute bottom-0 left-0 w-full h-0.5 transition-all"
      :class="active ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-transparent'"
    ></span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  active: boolean
}>()
</script>
