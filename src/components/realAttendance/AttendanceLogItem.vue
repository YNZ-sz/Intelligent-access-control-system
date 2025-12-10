<template>
  <div class="p-3 border-b last:border-0 hover:bg-gray-50 transition-colors">
    <div class="flex justify-between items-center mb-1">
      <span class="font-medium">{{ log.operator }}</span>
      <span class="text-xs text-gray-500">{{ log.operateTime }}</span>
    </div>
    <div class="text-sm">
      <span class="text-gray-400">操作：</span>
      {{ log.operation }}
      <span class="ml-2 text-gray-400">规则：</span>
      {{ log.ruleName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  log: {
    type: Object,
    required: true,
  },
})
</script>
