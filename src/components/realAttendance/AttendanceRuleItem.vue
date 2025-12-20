<template>
  <div class="flex p-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
    <img
      src="http://8.134.138.69:8080/file/rule/rule.png"
      class="max-w-20 max-h-20 w-auto h-auto object-contain mr-4"
      loading="lazy"
      alt="规则图标"
    />

    <div class="flex-1">
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-semibold text-lg">{{ rule.ruleName }}</h3>
        <el-tag :type="rule.isEnabled ? 'success' : 'info'">
          {{ rule.isEnabled ? '启用中' : '已禁用' }}
        </el-tag>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
        <div>
          <span class="text-gray-400">上班时间：</span>
          {{ rule.workStartTime }}
        </div>
        <div>
          <span class="text-gray-400">下班时间：</span>
          {{ rule.workEndTime }}
        </div>
        <div>
          <span class="text-gray-400">迟到阈值：</span>
          {{ rule.lateThreshold }}分钟
        </div>
        <div>
          <span class="text-gray-400">早退阈值：</span>
          {{ rule.earlyLeaveThreshold }}分钟
        </div>
      </div>
      <div class="flex gap-2">
        <el-button type="primary" size="small" @click="$emit('edit')">编辑</el-button>
        <el-button type="danger" size="small" @click="$emit('delete')" :disabled="rule.isEnabled">
          删除
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  rule: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>
