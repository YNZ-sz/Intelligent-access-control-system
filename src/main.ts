// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './assets/styles/main.css' // 引入 Tailwind 基础样式

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)
// app.use(ElementPlus)

// app.mount('#app')

// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/permission'
import App from './App.vue'
import './assets/styles/main.css' // 引入 Tailwind 基础样式

// 🔥 导入所有图标（新版本导出为 default）
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App)

// 🔥 全局注册所有图标（组件名：el-icon-图标名，比如 el-icon-user）
Object.keys(Icons).forEach((key) => {
  // @ts-ignore：忽略 TS 类型警告（因为 Icons 导出是动态的）
  app.component(`${key.charAt(0).toUpperCase() + key.slice(1)}`, Icons[key])
})

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
