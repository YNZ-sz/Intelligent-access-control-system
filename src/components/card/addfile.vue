<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
    <div class="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">请上传打卡凭证</h3>
          <el-icon class="cursor-pointer" @click="onCancel">
            <Close />
          </el-icon>
        </div>
      </div>
      <div class="flex flex-col items-center gap-2">
        <!-- 上传按钮/预览图 -->
        <div
          class="w-[300px] h-[300px] my-6 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          @click="openUpload"
        >
          <!-- 已上传时显示预览图，否则显示“+” -->
          <img
            v-if="previewUrl"
            :src="previewUrl"
            class="w-full h-full rounded-2xl object-cover"
            alt="打卡图片"
          />
          <span v-else class="text-gray-400 text-2xl">+</span>
        </div>
      </div>
      <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50/80 backdrop-blur-sm">
        <el-button type="default" @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSuccess">提交</el-button>
      </div>
    </div>
  </div>
  <input
    ref="fileInputRef"
    type="file"
    accept="image/*"
    class="hidden"
    @change="handleFileChange"
  />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { filedaCard } from '@/api/cardApi'

const emit = defineEmits(['visible', 'success'])
const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref('')
const selectedFile = ref<File | null>(null) // 保存选中的文件

const onCancel = () => {
  emit('visible', false)
}
const onSuccess = () => {
  emit('success', selectedFile.value)
  emit('visible', false)
}
const openUpload = () => {
  fileInputRef.value?.click()
}
// 处理文件选择
const handleFileChange = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) {
    return
  }

  // // 校验文件类型和大小
  // if (!file.type.startsWith('image/')) {
  //   ElMessage.error('请选择图片文件')
  //   return
  // }
  // if (file.size > 5 * 1024 * 1024) {
  //   // 限制5MB
  //   ElMessage.error('图片大小不能超过5MB')
  //   return
  // }
  selectedFile.value = file

  previewUrl.value = URL.createObjectURL(file)
}
</script>
