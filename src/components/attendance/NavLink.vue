<template>
  <a
    :href="href"
    class="relative py-2 transition-all duration-300"
    :class="active ? 'text-white' : 'text-slate-300 hover:text-white'"
  >
    <slot></slot>
    <span
      class="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300"
      :class="active ? 'bg-gradient-to-r from-blue-400 to-cyan-400' : 'bg-transparent'"
    ></span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  active: boolean
}>()
</script>
