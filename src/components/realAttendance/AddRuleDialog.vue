<template>
  <!-- 毛玻璃遮罩层 -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
    <!-- 弹窗主体 -->
    <div class="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
      <!-- 弹窗头部 -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-lg">添加考勤规则</h3>
          <el-icon class="cursor-pointer" @click="onCancel">
            <Close />
          </el-icon>
        </div>
      </div>

      <!-- 表单内容 -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-width="100px"
        class="p-6 space-y-4"
        :rules="formRules"
      >
        <el-form-item label="规则名称*" prop="ruleName">
          <el-input v-model="ruleForm.ruleName" placeholder="请输入规则名称" />
        </el-form-item>
        <el-time-picker
          v-model="ruleForm.workStartTime"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          placeholder="选择上班时间"
        />

        <el-time-picker
          v-model="ruleForm.workEndTime"
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          placeholder="选择下班时间"
        />
        <el-form-item label="迟到阈值*" prop="lateThreshold">
          <el-input-number v-model="ruleForm.lateThreshold" :min="0" placeholder="单位：分钟" />
        </el-form-item>
        <el-form-item label="早退阈值*" prop="earlyLeaveThreshold">
          <el-input-number
            v-model="ruleForm.earlyLeaveThreshold"
            :min="0"
            placeholder="单位：分钟"
          />
        </el-form-item>
      </el-form>

      <!-- 弹窗底部 -->
      <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50/80 backdrop-blur-sm">
        <el-button type="default" @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElTimePicker,
  ElInputNumber,
  ElButton,
  ElIcon,
  ElMessage,
} from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { useAttendanceStore } from '@/stores/attendance'
import type { addRuleItem } from '@/api/attendance'

const attendanceStore = useAttendanceStore()

// 接收外部传入的“是否显示弹窗”状态
// const props = defineProps({
//   visible: {
//     type: Boolean,
//     default: false,
//   },
// })

// 向父组件传递事件（关闭、提交成功）
const emit = defineEmits(['visible', 'onSuccess'])

// 表单数据
const ruleForm = reactive<addRuleItem>({
  ruleName: '',
  workStartTime: '',
  workEndTime: '',
  lateThreshold: 0,
  earlyLeaveThreshold: 0,
})

// 表单校验规则
const formRules = reactive({
  ruleName: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
  workStartTime: [{ required: true, message: '请选择上班时间', trigger: 'change' }],
  workEndTime: [{ required: true, message: '请选择下班时间', trigger: 'change' }],
  lateThreshold: [{ required: true, message: '请输入迟到阈值', trigger: 'blur' }],
  earlyLeaveThreshold: [{ required: true, message: '请输入早退阈值', trigger: 'blur' }],
})

// 表单引用
const ruleFormRef = ref<InstanceType<typeof ElForm>>()

// 取消（关闭弹窗）
const onCancel = () => {
  emit('visible', false)
  // 重置表单
  ruleFormRef.value?.resetFields()
}

// 提交表单
const onSubmit = async () => {
  if (!ruleFormRef.value) return

  try {
    // 表单校验
    await ruleFormRef.value.validate()
    // 调用后端接口上传数据
    attendanceStore.addAttendanceInfo(ruleForm)
    attendanceStore.fetchRuleList()
  } catch (err) {
    ElMessage.error('规则添加失败，请重试')
  }
}
</script>

<style scoped>
/* 强制将表单标签文字设为黑色 */
:deep(.el-form-item__label) {
  color: #333 !important; /* 黑色，可根据需要调整为 #000 等 */
}

/* 若星号（必填标记）也需调整，可单独设置 */
</style>
