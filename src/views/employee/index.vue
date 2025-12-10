<!-- src/views/employee/EmployeeView.vue -->
<template>
  <div class="bg-white/85 rounded-xl shadow-sm p-6">
    <!-- 页面标题 + 操作按钮 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h2 class="text-xl font-bold text-gray-800">员工管理</h2>
        <p class="text-gray-500 text-sm mt-1">管理员工信息、部门归属、考勤权限等</p>
      </div>
      <el-button
        type="primary"
        class="py-2 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none"
        @click="openAddDialog"
      >
        <el-icon class="mr-2"><Plus /></el-icon>
        新增员工
      </el-button>
    </div>

    <!-- 搜索筛选栏 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <el-input
        v-model="searchForm.keyword"
        placeholder="输入姓名/工号搜索"
        class="w-full"
        prefix="el-icon-search"
        size="small"
      />
      <el-select v-model="searchForm.department" placeholder="选择部门" class="w-full" size="small">
        <el-option label="全部部门" value=""></el-option>
        <el-option label="技术部" value="技术部"></el-option>
        <el-option label="人事部" value="人事部"></el-option>
        <el-option label="财务部" value="财务部"></el-option>
        <el-option label="市场部" value="市场部"></el-option>
      </el-select>
      <el-select v-model="searchForm.status" placeholder="员工状态" class="w-full" size="small">
        <el-option label="全部状态" value=""></el-option>
        <el-option label="在职" value="1"></el-option>
        <el-option label="离职" value="0"></el-option>
      </el-select>
      <div class="flex gap-2">
        <el-button type="primary" size="small" @click="handleSearch">搜索</el-button>
        <el-button type="default" size="small" @click="resetSearch">重置</el-button>
      </div>
    </div>

    <!-- 员工列表 -->
    <el-table
      :data="employeeList"
      border
      stripe
      :header-cell-class-name="'bg-gray-50 text-gray-700'"
      class="bg-white/0 w-full mb-4"
      :responsive="true"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="工号" prop="userId" width="100" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" width="120" align="center">
        <template #default="scope">
          <div class="flex items-center justify-center">
            <el-avatar :size="28" class="mr-2 bg-indigo-100 text-indigo-600">
              {{ scope.row.name.slice(0, 1) }}
            </el-avatar>
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" width="80" align="center">
        <template #default="scope">
          <el-tag size="small" :type="scope.row.gender === '男' ? 'primary' : 'success'">
            {{ scope.row.gender }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="部门" prop="department" width="120" align="center"></el-table-column>
      <el-table-column label="职位" prop="position" width="120" align="center"></el-table-column>
      <el-table-column
        label="入职日期"
        prop="createTime"
        width="140"
        align="center"
      ></el-table-column>
      <el-table-column label="状态" prop="status" width="100" align="center">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            active-text="在职"
            inactive-text="离职"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button
            type="text"
            text-color="#4f46e5"
            size="small"
            @click="openEditDialog(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            text-color="#ef4444"
            size="small"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="flex justify-between items-center">
      <div class="text-gray-500 text-sm">共 {{ total }} 条数据，当前第 {{ page }} 页</div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[8, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        size="small"
      ></el-pagination>
    </div>
  </div>

  <!-- 新增/编辑员工弹窗 -->
  <el-dialog
    :title="dialogType === 'add' ? '新增员工' : '编辑员工'"
    width="500px"
    append-to-body="true"
    style="z-index: 9999"
    v-model="isDialogOpen"
  >
    <el-form
      :model="form"
      :rules="formRules"
      ref="formRef"
      label-width="100px"
      label-position="left"
      class="mt-4"
    >
      <el-form-item label="工号" prop="id" v-if="dialogType === 'edit'">
        <el-input v-model="form.id" disabled placeholder="编辑时不可修改" size="small"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入员工姓名" size="small"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别" size="small">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="form.department" placeholder="请选择部门" size="small">
          <el-option label="技术部" value="技术部"></el-option>
          <el-option label="人事部" value="人事部"></el-option>
          <el-option label="财务部" value="财务部"></el-option>
          <el-option label="市场部" value="市场部"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="form.position" placeholder="请输入职位" size="small"></el-input>
      </el-form-item>
      <el-form-item label="入职日期" prop="hireDate">
        <el-date-picker
          v-model="form.hireDate"
          type="date"
          placeholder="选择入职日期"
          size="small"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择员工状态" size="small">
          <el-option label="在职" value="1"></el-option>
          <el-option label="离职" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button size="small" @click="isDialogOpen = false">取消</el-button>
      <el-button size="small" type="primary" @click="submitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { Plus, Search } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'

// import {useEmployeeStore} from '@stores/employee'
import { useEmployeeStore } from '@/stores/employee'

// 表格数据类型定义
interface Employee {
  userId: string
  name: string
  gender: '男' | '女'
  department: string
  position: string
  createTime: string
  status: string

  phone?: string
  faceStatus?: string
  lastCheckInTime?: string
}

// 响应式变量
const employeeList = ref<Employee[]>([]) // 员工列表
const total = ref<number>(0) // 总数据量
const page = ref<number>(1) // 当前页码
const pageSize = ref<number>(8) // 每页条数

// 搜索表单
const searchForm = reactive({
  keyword: '',
  department: '',
  status: '',
})

// 弹窗相关
const isDialogOpen = ref<boolean>(false)
const dialogType = ref<'add' | 'edit'>('add') // 弹窗类型：新增/编辑
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

// 表单数据
const form = reactive({
  id: '',
  name: '',
  gender: '男',
  department: '',
  position: '',
  hireDate: '',
  status: '1',
})

// 表单校验规则
const formRules = reactive({
  name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  hireDate: [{ required: true, message: '请选择入职日期', trigger: 'change' }],
  status: [{ required: true, message: '请选择员工状态', trigger: 'change' }],
})

const EmployeeStore = useEmployeeStore()

// 页面加载时获取员工列表
onMounted(() => {
  fetchEmployeeList()
})

// 模拟获取员工列表数据（实际项目替换为接口请求）
const fetchEmployeeList = async () => {
  // 模拟接口延迟
  setTimeout(() => {
    // 模拟数据
    // 模拟数据修改：给 department 加默认值 "技术部"
    const mockData: Employee[] = Array.from({ length: pageSize.value }, (_, index) => {
      const userId = String((page.value - 1) * pageSize.value + index + 1001)
      const departments = ['技术部', '人事部', '财务部', '市场部']
      return {
        userId,
        name: index % 2 === 0 ? `张三${userId.slice(-3)}` : `李四${userId.slice(-3)}`,
        gender: index % 2 === 0 ? '男' : '女',
        // 加 || "技术部"，确保即使索引异常也有默认值
        department: departments[Math.floor(Math.random() * departments.length)] || '技术部',
        position: index % 3 === 0 ? '工程师' : index % 3 === 1 ? '经理' : '专员',
        createTime: `202${3 + Math.floor(Math.random() * 3)}-${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}-${String(Math.floor(Math.random() * 28 + 1)).padStart(2, '0')}`,
        status: Math.random() > 0.2 ? '1' : '0',
      }
    })
    employeeList.value = mockData
    total.value = 128 // 模拟总数据量
  }, 200)

  // try {
  //   await  EmployeeStore.get_employee()
  // } catch (err: any) {
  //   console.error('获取员工列表失败：' + err)
  //   return
  // }
  // total.value = EmployeeStore.employeeData.total
  // page.value = EmployeeStore.employeeData.pageNum
  // pageSize.value = EmployeeStore.employeeData.pageSize
  // employeeList.value = EmployeeStore.employeeData.total
}

// 搜索
const handleSearch = () => {
  page.value = 1 // 搜索后重置到第一页
  fetchEmployeeList() // 实际项目中传递搜索参数到接口
  ElMessage.success('搜索成功')
}

// 重置搜索
const resetSearch = () => {
  searchForm.keyword = ''
  searchForm.department = ''
  searchForm.status = ''
  page.value = 1
  fetchEmployeeList()
}

// 页码改变
const handleCurrentChange = (val: number) => {
  page.value = val
  fetchEmployeeList()
}

// 每页条数改变
const handleSizeChange = (val: number) => {
  pageSize.value = val
  page.value = 1
  fetchEmployeeList()
}

watch(
  () => isDialogOpen.value, // 监听 isDialogOpen 的变化
  (newVal) => {
    if (newVal) {
      // 只有弹窗从“隐藏”变为“显示”时才执行
      // 确保 formRef 已挂载（避免初始化时 null 报错）
      nextTick(() => {
        if (formRef.value) {
          formRef.value.clearValidate()
        }
      })
    }
  },
  { immediate: false }, // 初始加载时不触发（按需调整）
)

// 打开新增弹窗
const openAddDialog = () => {
  dialogType.value = 'add'
  // 重置表单
  form.id = ''
  form.name = ''
  form.gender = '男'
  form.department = ''
  form.position = ''
  form.hireDate = ''
  form.status = '1'
  isDialogOpen.value = true
}

// 打开编辑弹窗
const openEditDialog = (row: Employee) => {
  dialogType.value = 'edit'
  // 赋值表单数据
  form.id = row.userId
  form.name = row.name
  form.gender = row.gender
  form.department = row.department
  form.position = row.position
  form.hireDate = row.createTime
  form.status = row.status
  isDialogOpen.value = true
}

// 提交表单（新增/编辑）
const submitForm = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate() // 表单校验
    if (dialogType.value === 'add') {
      try {
        await EmployeeStore.add_employee({
          name: form.name,
          phone: '13360099111',
          department: form.department,
          position: form.position,
          hireDate: form.hireDate,
        })
      } catch (err: any) {
        console.error('新增员工失败：' + err)
      }

      // 模拟新增接口请求
      // setTimeout(() => {
      //   ElMessage.success('新增员工成功')
      //   isDialogOpen.value = false
      //   fetchEmployeeList() // 刷新列表
      // }, 300)
    } else {
      // 模拟编辑接口请求
      setTimeout(() => {
        ElMessage.success('编辑员工成功')
        isDialogOpen.value = false
        fetchEmployeeList() // 刷新列表
      }, 300)
    }
  } catch (error) {
    ElMessage.error('表单校验失败，请检查必填项')
  }
}

// 改变员工状态（在职/离职）
const handleStatusChange = (row: Employee) => {
  const statusText = row.status === '1' ? '在职' : '离职'
  ElMessage.success(`员工 ${row.name} 状态已改为${statusText}`)
  // 实际项目中调用接口更新状态
}

// 删除员工
const handleDelete = (id: string) => {
  ElMessageBox.confirm('此操作将永久删除该员工信息，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      // 模拟删除接口请求
      setTimeout(() => {
        employeeList.value = employeeList.value.filter((item) => item.userId !== id)
        total.value--
        ElMessage.success('删除成功')
      }, 300)
    })
    .catch(() => {
      ElMessage.info('已取消删除')
    })
}
</script>

<style scoped>
/* 表格表头样式优化 */
:deep(.el-table__header th) {
  font-weight: 500 !important;
}

/* 弹窗表单间距优化 */
:deep(.el-form-item) {
  margin-bottom: 16px;
}

/* 响应式适配：小屏幕下表格操作列换行 */
@media (max-width: 768px) {
  :deep(.el-table-column--operation) {
    .el-button {
      display: block;
      margin: 2px 0;
    }
  }
}
</style>
